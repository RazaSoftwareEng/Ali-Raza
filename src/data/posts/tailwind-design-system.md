Utility-first CSS changed the way many of us build interfaces. With Tailwind CSS you can go from an empty file to a polished, responsive layout in minutes, without ever leaving your markup or inventing another class name. But that speed comes with a hidden risk. On a growing codebase with several developers, utility classes make it just as easy to be inconsistent as to be consistent: five slightly different greys, three button styles, spacing that never quite lines up, and a dark mode that works on some pages but not others.

The solution is not to abandon Tailwind — it is to put a small **design system** on top of it. In this article I explain how I structure Tailwind projects so they stay consistent as they grow, using the same approach that powers this portfolio, including the light and dark theme you can switch from the navigation bar.

## What a design system actually is

"Design system" can sound like something only large companies with dedicated teams can afford. In practice, a design system is just a shared set of decisions that everyone on the team agrees to reuse instead of re-deciding every time. For most web projects it has four layers:

1. **Design tokens** — the raw values: colors, font families, font sizes, spacing, radii and shadows.
2. **Components** — reusable building blocks such as buttons, inputs, cards and badges, built only from tokens.
3. **Patterns** — combinations of components that solve common problems, like a page header, a form layout or an empty state.
4. **Guidelines** — the conventions and documentation that tell people when and how to use each piece.

Tailwind already gives you a great default set of tokens. The work of a design system is narrowing those choices down to the ones your product uses, giving them meaningful names, and making the right choice the easy one.

## Start with design tokens

The foundation of everything is your theme. In Tailwind CSS v4, configuration lives directly in your stylesheet using the `@theme` directive. Every variable you define there becomes a utility class automatically:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --color-brand: #4f46e5;
  --radius-card: 1rem;
}
```

With that in place you can write `font-sans`, `bg-brand` or `rounded-card` anywhere in your markup. The important discipline is that once a token exists, nobody uses an arbitrary value like `bg-[#4f46e6]` instead. If a design genuinely needs a new value, it gets added to the theme with a name, so the next person can reuse it.

### Prefer semantic names over raw colors

The most valuable improvement you can make is to name colors by **what they are for**, not by what they look like. Compare these two approaches:

- Raw: `bg-white text-slate-700 border-slate-200`
- Semantic: `bg-page text-body border-line`

The semantic version tells the reader the intent. More importantly, it lets you change what those names point to without touching a single component. That is exactly how theming works:

```css
@theme inline {
  --color-page: var(--page);
  --color-fg: var(--fg);
  --color-body: var(--body);
  --color-line: var(--line);
}

:root {
  --page: #ffffff;
  --fg: #0f172a;
  --body: #334155;
  --line: #e2e8f0;
}

.dark {
  --page: #020617;
  --fg: #ffffff;
  --body: #cbd5e1;
  --line: #1e293b;
}
```

When the `dark` class is added to the `html` element, every component that uses `bg-page` or `text-fg` updates at once. There are no `dark:` variants scattered across hundreds of elements, and it is impossible to forget one. This is the technique behind the theme toggle on this site.

A good starting set of semantic tokens for most products is: `page` (the background), `surface` (cards and panels), `fg` (headings), `body` (paragraph text), `muted` (secondary text), `line` (borders) and `accent` (links and highlights). Add status colors such as `success`, `warning` and `danger` when you need them.

### Define a type and spacing scale

Typography is where inconsistency shows first. Pick a limited type scale — for example `text-sm` for metadata, `text-base` for body copy, `text-xl` for card titles and `text-3xl` or `text-4xl` for section headings — and stick to it. The same goes for spacing: Tailwind's scale is based on multiples of 4px, which works well, but agreeing that sections use `py-16` or `py-24` and cards use `p-6` removes dozens of small decisions from every pull request.

## Extract repeated patterns into components

Tailwind's own documentation is clear that long class lists are fine, but **duplicated** long class lists are a maintenance problem. My rule of thumb: when the same group of utilities appears three times, it becomes a component.

In a React project, the best abstraction is usually a React component, because it can also encapsulate behavior and variants:

```jsx
const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
  secondary: 'border border-line-strong text-fg hover:bg-subtle',
}

export function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
```

For very small, purely visual patterns, a CSS component class built with `@apply` is also perfectly reasonable. This site uses a handful of them — `.card`, `.tag`, `.input`, `.btn-primary` — defined once in the global stylesheet:

```css
@layer components {
  .card {
    @apply rounded-2xl border border-line bg-surface p-6 transition hover:border-line-strong;
  }
}
```

Use `@apply` sparingly. If you find yourself rebuilding an entire CSS framework with it, you have lost the benefits of utility classes. Keep it for the five to ten primitives that appear everywhere.

### Typical first components

If you are starting from scratch, these components give you the biggest return:

- **Button** with primary, secondary and ghost variants, plus sizes.
- **Input**, **Textarea** and **Select** with shared focus and error styles.
- **Card** for grouping content.
- **Badge** or **Tag** for labels and categories.
- **SectionHeading** for consistent page sections.
- **Container** for consistent page width and horizontal padding.

## Handle variants without the mess

As components grow, conditional class strings can become hard to read. Two small libraries help a lot. **clsx** makes conditional classes readable, and **tailwind-merge** resolves conflicts so that a `className` passed from outside reliably overrides the defaults:

```jsx
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs) => twMerge(clsx(inputs))

<button className={cn('px-4 py-2', isActive && 'bg-indigo-600 text-white', className)} />
```

For components with several dimensions of variation — size, intent, state — a variant helper such as `class-variance-authority` keeps everything declarative and type-safe. That pairs especially well with TypeScript union types, which I describe in [TypeScript Tips That Make React Code Safer](/blogs/typescript-tips-for-react).

## Agree on conventions

Tools enforce some consistency; conventions handle the rest. These are the ones I recommend writing down in your README:

- **Class order is automatic.** Install `prettier-plugin-tailwindcss` so classes are always sorted the same way. It ends a surprising number of review comments.
- **No arbitrary values without a reason.** `w-[37px]` should be rare and should come with a comment.
- **Mobile first.** Write the base styles for small screens and add `md:` and `lg:` overrides, never the other way around.
- **Semantic tokens for color.** Raw palette colors like `text-slate-500` are allowed only inside the theme definition.
- **Accessibility is part of the component.** Focus rings, sufficient contrast and `aria` attributes belong in the shared component, not in each usage.

## Dark mode done right

Dark mode is the best stress test for a design system. If your colors are semantic tokens, adding a dark theme is a matter of defining a second set of values. If they are not, you are in for a long afternoon of adding `dark:` variants by hand.

A few details make the experience feel polished:

1. **Respect the user's choice and remember it.** Store the preference in `localStorage` and apply it on the next visit.
2. **Avoid the flash.** Apply the `dark` class with a tiny inline script in `index.html`, before React loads, so the page never flashes the wrong theme.
3. **Do not simply invert colors.** Dark backgrounds need slightly lighter, less saturated accents to keep good contrast, and shadows need to be replaced with borders or subtle highlights.
4. **Check contrast in both themes.** Aim for at least a 4.5:1 contrast ratio for body text.

## Document and evolve the system

A design system that only lives in one developer's head is not a system. Document each component with a short description, its variants and an example. For larger teams, **Storybook** is the standard tool; for smaller projects, a single "kitchen sink" page in the app that renders every component is enough and takes an hour to build.

Treat the system as a product that evolves. When a new design does not fit the existing components, that is a useful conversation, not a failure. Either the design adapts to the system, or the system gains a new, well-named piece that everyone can reuse.

## Common pitfalls to avoid

Even with good intentions, a few mistakes show up on almost every Tailwind project I review. Knowing them in advance saves a lot of cleanup later.

- **Building class names dynamically.** Tailwind scans your source files for complete class names, so a class such as `bg-red-500` assembled from a template string at runtime will not be generated. Map values to full class strings instead, as in the button variants above.
- **Too many tokens.** A theme with twenty shades of grey is not a system, it is a palette. Fewer, well-named tokens are easier to use correctly.
- **Overriding instead of composing.** If you constantly fight a component's default styles with extra classes, the component probably needs a new variant.
- **Ignoring focus and hover states.** Interactive states are part of the design. Define them once in the shared component so every button and link behaves the same way.
- **Skipping real content.** Test components with long names, empty states and translated text. A card that looks perfect with "Lorem ipsum" can fall apart with a real product title.

Catching these early keeps the system trustworthy, and a trusted system is one the whole team actually uses.

## The payoff

Consistent components do more than look tidy. They make development faster, because new screens are assembled from tested parts. They make reviews easier, because there is less to discuss. And they even improve performance, because fewer one-off styles mean smaller CSS — one of the many small wins I cover in [10 Practical Tips to Speed Up Your React App](/blogs/react-performance-tips).

Start small: define your semantic color tokens today, extract your button and card components this week, and write down three conventions for the team. You will feel the difference within a sprint.

This portfolio is built exactly this way, so feel free to browse the [projects](/portfolio) to see the system in action. If you would like help setting up a design system for your own product, [let's talk](/contact).
