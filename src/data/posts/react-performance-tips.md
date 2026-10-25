A slow interface quietly costs you users. Research from Google has shown again and again that every extra second of loading time increases the chance a visitor leaves, and sluggish interactions — a search box that lags, a list that stutters while scrolling — make even a well-designed product feel cheap. React is fast by default, but as an application grows it is easy to slip into patterns that make it do far more work than necessary.

The good news is that most React performance problems come from a small number of predictable causes, and each of them has a well-known fix. In this article I walk through the ten techniques I reach for first on production projects, in roughly the order I apply them. None of them require rewriting your app, and most can be introduced one component at a time.

## 1. Measure before you optimize

The single most important rule of performance work is to measure first. It is tempting to sprinkle `useMemo` across every component "just in case", but optimizations that are not aimed at a real bottleneck add complexity without making anything faster — and sometimes make things slower.

Start with the **React DevTools Profiler**. Record a slow interaction, such as typing into a search field or opening a modal, and look at the flame chart. Components highlighted in yellow or orange took the longest to render. Enable the setting "Record why each component rendered while profiling" and the Profiler will tell you whether a component re-rendered because its props changed, its state changed, or simply because its parent rendered.

For load performance, run **Lighthouse** in Chrome DevTools and pay attention to Largest Contentful Paint (LCP), Total Blocking Time (TBT) and Interaction to Next Paint (INP). These Core Web Vitals reflect what real users feel and also influence search rankings. Write the numbers down before you change anything so you can prove that each change actually helped.

> Tip: test on a throttled CPU ("4x slowdown" in the Performance panel). Your development laptop is much faster than the average phone, and problems that are invisible on your machine are obvious on real devices.

## 2. Ship less JavaScript with code splitting

Every kilobyte of JavaScript has to be downloaded, parsed and executed before your app becomes interactive. On a mid-range phone, parsing and executing JavaScript is often more expensive than downloading it. The most effective way to reduce that cost is to stop sending code the user does not need yet.

React supports code splitting out of the box with `React.lazy` and dynamic `import()`. The most natural place to split is at the route level, because users only ever look at one page at a time:

```jsx
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

Bundlers such as Vite automatically put each lazily imported module into its own chunk. Beyond routes, consider lazy loading heavy components that are not visible on first render — rich text editors, charts, maps and date pickers are classic candidates.

It is also worth auditing your dependencies. Tools like `rollup-plugin-visualizer` show exactly what is inside your bundle, and it is common to discover a date library pulling in every locale, or an icon package shipping thousands of icons when you use ten.

## 3. Keep state close to where it is used

When state changes, React re-renders the component that owns that state and, by default, every component below it. If a piece of state lives at the top of your tree, every keystroke in a form field can re-render the entire page.

The fix is usually to **move state down**. If only a search box needs to know what the user is typing, the search box should own that state, not the page. Similarly, a modal's open/closed state belongs next to the modal rather than in a global store.

When state genuinely needs to be shared, you can often **lift the content up** instead. Pass expensive, unrelated children as `children` props: React will not re-render them when the wrapper's state changes, because they were created by the parent.

```jsx
function ScrollTracker({ children }) {
  const [scrollY, setScrollY] = useState(0)
  // ...update scrollY on scroll
  return <div data-scroll={scrollY}>{children}</div>
}

// ExpensiveTree is created here, so it doesn't re-render on scroll
<ScrollTracker>
  <ExpensiveTree />
</ScrollTracker>
```

## 4. Memoize deliberately

`React.memo`, `useMemo` and `useCallback` are powerful but frequently misused. Memoization trades memory and comparison work for skipped renders, so it only pays off when the skipped work is actually expensive.

Use **`React.memo`** on components that render often with the same props and are expensive to render — rows in a large table, cards in a grid, or a chart. Then make sure the props you pass are stable: a new object, array or function created on every render defeats `React.memo` completely. That is where `useMemo` and `useCallback` come in.

```jsx
const ProductRow = memo(function ProductRow({ product, onSelect }) {
  return <tr onClick={() => onSelect(product.id)}>...</tr>
})

function ProductTable({ products }) {
  const [selected, setSelected] = useState(null)
  const handleSelect = useCallback((id) => setSelected(id), [])
  const sorted = useMemo(() => [...products].sort(byName), [products])

  return sorted.map((p) => <ProductRow key={p.id} product={p} onSelect={handleSelect} />)
}
```

Use **`useMemo`** for genuinely expensive calculations — filtering or sorting thousands of items, building derived data structures — not for adding two numbers. If you are using the React Compiler, much of this happens automatically, but understanding the principle still helps you write components the compiler can optimize.

If your project uses TypeScript, typed props make memoized components much safer to refactor. I cover the patterns I use in [TypeScript Tips That Make React Code Safer](/blogs/typescript-tips-for-react).

## 5. Virtualize long lists

Rendering ten thousand rows creates ten thousand DOM nodes, even though the user can only see twenty of them at a time. The browser has to lay out and paint every one of them, and scrolling becomes painfully slow.

**Virtualization** (also called windowing) solves this by rendering only the items currently visible in the viewport, plus a small buffer. As the user scrolls, rows are recycled. Libraries such as `react-window` and TanStack Virtual make this straightforward:

```jsx
import { FixedSizeList } from 'react-window'

<FixedSizeList height={600} itemCount={rows.length} itemSize={48} width="100%">
  {({ index, style }) => <div style={style}>{rows[index].name}</div>}
</FixedSizeList>
```

As a rule of thumb, consider virtualization once a list regularly exceeds a few hundred items. For smaller lists, pagination or "load more" is often simpler and better for usability anyway.

## 6. Keep the UI responsive with transitions

Some updates are urgent — the character a user just typed must appear immediately — and some are not, like re-filtering a large list based on that input. React 18 introduced **transitions** to express exactly that difference.

Wrap non-urgent updates in `startTransition`, or use `useDeferredValue` to let React render a slightly stale version of expensive UI while it works on the new one in the background:

```jsx
function Search({ items }) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const results = useMemo(() => filterItems(items, deferredQuery), [items, deferredQuery])

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ResultsList results={results} />
    </>
  )
}
```

The input stays perfectly responsive, and the results catch up a moment later. For network-backed search, combine this with **debouncing** so you do not fire a request on every keystroke.

## 7. Fetch data efficiently

Many "slow React apps" are really slow data apps. A common culprit is the **request waterfall**: a parent component fetches data, renders a child, and only then does the child start its own request. Three nested components can easily triple your loading time.

- Fetch independent data in parallel with `Promise.all` instead of sequentially.
- Start requests as early as possible — in a route loader rather than inside a deeply nested `useEffect`.
- Use a data-fetching library such as TanStack Query or SWR to get caching, deduplication and background refetching for free.
- Ask your backend for exactly the data you need. Large responses cost time to download and to parse.

The last point is where good API design pays off for the frontend. I share the conventions I use in [REST API Best Practices Every Developer Should Know](/blogs/rest-api-best-practices).

## 8. Optimize images and fonts

Images are usually the heaviest part of a page, and the largest image is often the element that determines your LCP score.

- Serve modern formats such as **WebP** or **AVIF**, which are typically 30–50% smaller than JPEG at the same quality.
- Always set `width` and `height` attributes so the browser can reserve space and avoid layout shifts.
- Add `loading="lazy"` to images below the fold, but **not** to your hero image — that one should load as early as possible, ideally with `fetchpriority="high"`.
- Use responsive images with `srcset` so phones do not download desktop-sized files.

Fonts deserve the same care. Self-host or preconnect to your font provider, load only the weights you actually use, and use `font-display: swap` so text is visible while the font loads.

## 9. Avoid layout thrashing and heavy effects

Effects that read layout (`getBoundingClientRect`, `offsetHeight`) and then immediately write styles force the browser to recalculate layout synchronously, sometimes many times per frame. Batch reads before writes, and prefer CSS for animations — `transform` and `opacity` can be animated on the GPU without triggering layout at all.

Also watch out for effects that run far more often than intended. A missing dependency array, or an object dependency that is recreated on every render, can turn a one-time setup into work that happens on every render. Scroll and resize listeners should be passive and throttled, or replaced with `IntersectionObserver` and `ResizeObserver`, which are designed for exactly these jobs.

## 10. Build for production and monitor real users

It sounds obvious, but always measure production builds. Development mode includes extra checks and warnings that make React significantly slower, so numbers taken from `npm run dev` are misleading. Run `npm run build` followed by `npm run preview` before profiling load performance.

Finally, lab tools only tell part of the story. Real-user monitoring — through the `web-vitals` library, Vercel Analytics or a service like Sentry — shows how your app performs on real devices and networks. Set a performance budget (for example, "the main bundle stays under 200 KB gzipped") and check it in CI so regressions are caught before they ship. If you have not set up CI yet, my guide to [a simple Git workflow for small teams](/blogs/git-workflow-for-teams) shows where it fits.

## Putting it all together

Performance is not a one-off project; it is a habit. The process that works for me on every project is simple:

1. Measure with the Profiler and Lighthouse on a throttled device.
2. Fix the single biggest bottleneck — usually bundle size, a waterfall or an unnecessary re-render.
3. Measure again to confirm the improvement.
4. Add a guardrail, such as a bundle-size check, so it stays fixed.

Start with the cheap wins — route-level code splitting, image optimization and moving state down — and you will often find that the app is fast enough without any memoization at all.

You can see these techniques applied in the projects on my [portfolio](/portfolio). If your React application feels slower than it should and you would like a second pair of eyes, [get in touch](/contact) — performance audits are one of my favourite kinds of work.
