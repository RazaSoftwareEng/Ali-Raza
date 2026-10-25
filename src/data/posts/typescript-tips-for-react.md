JavaScript lets you ship quickly, but it also lets you ship bugs quickly. A misspelled prop name, a value that is sometimes `undefined`, an API that quietly changed the shape of its response — in plain JavaScript you discover these problems when a user reports a blank screen. TypeScript moves that discovery to the moment you write the code, right inside your editor.

React projects benefit from TypeScript more than most, because so much of React is about passing data between components. Every prop, every piece of state and every API response is a contract, and TypeScript makes those contracts explicit and enforced. In this article I share the patterns I use every day to write safer React code, from the basics of typing props to the techniques that eliminate entire classes of bugs.

## Why TypeScript is worth it in React

The most obvious benefit is catching errors before they reach users, but in my experience that is not even the biggest one. TypeScript makes your editor dramatically smarter: autocomplete knows every prop a component accepts, hovering over a function shows exactly what it returns, and renaming a field updates every usage across the project safely.

The second big benefit is **confident refactoring**. In a large JavaScript codebase, changing the shape of an object is frightening because you cannot be sure you found every place that uses it. In TypeScript, you change the type and the compiler gives you a precise list of everything that needs updating. Refactors that would take a day of careful searching take an hour.

Finally, types are **documentation that cannot go out of date**. A new developer can understand how a component is meant to be used just by reading its props type.

## Start with strict mode

If you take only one tip from this article, take this one: turn on `strict` mode from day one. Without it, TypeScript allows many unsafe patterns, and you get much less protection than you think.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

The most important part of strict mode is `strictNullChecks`, which forces you to handle `null` and `undefined` explicitly. The famous "cannot read properties of undefined" error is the most common runtime error in JavaScript applications, and this single setting prevents most of them. `noUncheckedIndexedAccess` goes further by reminding you that `items[0]` might not exist.

Adding strict mode to an existing project can produce hundreds of errors at once. In that case, enable it and fix one folder at a time, or use the `// @ts-expect-error` comment temporarily and track the remaining issues.

## Type your component props

Props are the public interface of a component, so they are the most important thing to type. Use a `type` alias (or an `interface` — both work, just be consistent) and destructure the props in the function signature:

```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', disabled = false, onClick, children }: ButtonProps) {
  return (
    <button className={cn(styles[variant], sizes[size])} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
```

A few details are worth noticing. Optional props are marked with `?` and given defaults in the destructuring. `children` is typed as `React.ReactNode`, which accepts anything React can render. And I prefer plain function declarations over `React.FC`, because they are simpler and do not add an implicit `children` prop.

### Extend native element props

When you build a wrapper around a native element, such as an input or button, users of your component expect to pass any normal HTML attribute. Instead of re-typing them all, extend the built-in types:

```tsx
type InputProps = React.ComponentProps<'input'> & {
  label: string
  error?: string
}

export function TextField({ label, error, id, ...rest }: InputProps) {
  return (
    <label htmlFor={id}>
      {label}
      <input id={id} aria-invalid={Boolean(error)} {...rest} />
      {error && <span role="alert">{error}</span>}
    </label>
  )
}
```

Now `TextField` accepts `placeholder`, `type`, `onChange`, `maxLength` and every other input attribute, all fully typed.

## Prefer union types over loose strings and booleans

A prop typed as `string` accepts any string, including typos like `"primray"`. A prop typed as `'primary' | 'secondary'` accepts only valid values, and your editor will autocomplete them. Use **string literal unions** for any prop with a fixed set of options: variants, sizes, statuses and alignments.

The same idea transforms how you model state. A very common pattern is to track a request with several separate pieces of state:

```tsx
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const [data, setData] = useState<User[] | null>(null)
```

This allows impossible combinations — what does it mean to be loading *and* have an error *and* have data? A **discriminated union** makes impossible states impossible to represent:

```tsx
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T }

function UserList({ state }: { state: RequestState<User[]> }) {
  switch (state.status) {
    case 'idle':
    case 'loading':
      return <Spinner />
    case 'error':
      return <ErrorMessage text={state.message} />
    case 'success':
      return state.data.map((u) => <UserRow key={u.id} user={u} />)
  }
}
```

Inside each `case`, TypeScript knows exactly which fields exist. You cannot accidentally read `data` while in the error state, because the compiler will not let you. This pattern alone has prevented more bugs in my projects than any other.

## Let inference do most of the work

Good TypeScript code has fewer type annotations than you might expect. TypeScript infers types from values, so annotate only where inference cannot help:

- `useState(0)` is already inferred as `number`, and `useState('')` as `string`. No annotation needed.
- Annotate when the initial value does not tell the whole story: `useState<User | null>(null)` or `useState<string[]>([])`.
- Let function return types be inferred for small components and helpers; annotate them for exported functions and public APIs, where an explicit type acts as a contract.
- Avoid `any`. It switches off type checking completely and spreads silently. If you truly do not know a type, use `unknown` and narrow it before use.

## Type events and refs correctly

Event handlers are a common source of confusion. React provides generic event types for every situation, and the easiest way to get them right is to let TypeScript infer them from inline handlers. When you define handlers separately, use the matching type:

```tsx
function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(query)
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} value={query} onChange={handleChange} />
    </form>
  )
}
```

Note the optional chaining in `inputRef.current?.focus()`. A ref can be `null` before the component mounts, and strict mode makes sure you handle that.

## Type your API responses once

Data from your backend is where types matter most and where they are most often missing. Define the shape of each response in one shared place and reuse it everywhere:

```ts
export type Patient = {
  id: number
  name: string
  phone: string
  lastVisit: string | null
}

export type Paginated<T> = {
  data: T[]
  meta: { nextCursor: string | null; hasMore: boolean }
}

export async function getPatients(cursor?: string): Promise<Paginated<Patient>> {
  const res = await fetch(`/api/v1/patients${cursor ? `?cursor=${cursor}` : ''}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}
```

There is one important caveat: TypeScript types disappear at runtime. If the server sends something different from what you declared, TypeScript cannot know. For data you do not fully control, validate it at the boundary with a schema library such as **Zod**, and derive the TypeScript type from the schema so the two can never disagree:

```ts
import { z } from 'zod'

const PatientSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  lastVisit: z.string().nullable(),
})

export type Patient = z.infer<typeof PatientSchema>
```

When backend and frontend agree on consistent response shapes and error formats, this becomes even easier — the conventions I recommend are in [REST API Best Practices Every Developer Should Know](/blogs/rest-api-best-practices).

## Generic components

Generics let you write one component that works with many data types while staying fully type-safe. A reusable list or table is the classic example:

```tsx
type ListProps<T> = {
  items: T[]
  getKey: (item: T) => string | number
  renderItem: (item: T) => React.ReactNode
}

export function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  return <ul>{items.map((item) => <li key={getKey(item)}>{renderItem(item)}</li>)}</ul>
}

// T is inferred as Patient, so `p` is fully typed
<List items={patients} getKey={(p) => p.id} renderItem={(p) => p.name} />
```

TypeScript infers `T` from the `items` you pass, so callers never have to write the type themselves.

## Type context and custom hooks

React context is often typed loosely, leading to `undefined` errors deep in the tree. A small helper hook solves this neatly by throwing a clear error if the context is used outside its provider:

```tsx
type AuthContextValue = { user: User | null; logout: () => void }

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
```

Every component that calls `useAuth()` now receives a fully typed, non-null value. The same principle applies to all custom hooks: give them explicit return types when they are shared across the app, so their contract is clear.

## Common mistakes to avoid

A few habits undo much of the safety TypeScript provides. Watch out for these in your own code and in reviews:

- **Reaching for `any` under pressure.** It feels like a quick fix, but it silently disables checking everywhere the value flows. Use `unknown` and narrow it, or write the proper type.
- **Overusing type assertions.** Writing `data as User` tells the compiler to trust you without checking. Assertions are sometimes necessary, but each one is a place where a bug can hide.
- **Non-null assertions everywhere.** The `!` operator, as in `user!.name`, is an assertion in disguise. Handle the `null` case explicitly instead.
- **Duplicating types.** If the same shape is declared in three files, they will eventually disagree. Define it once and import it, or derive it with utility types such as `Pick`, `Omit` and `Partial`.
- **Typing too early and too precisely.** Over-engineered generic types are hard to read. Start simple and add precision only where it prevents real mistakes.

Treat type errors as helpful feedback rather than obstacles. When the compiler complains, it is usually pointing at a real edge case you had not considered yet.

## Migrating an existing JavaScript project

You do not need to rewrite everything to adopt TypeScript. Vite supports `.ts` and `.tsx` files out of the box, and JavaScript and TypeScript files can live side by side. A practical migration path is:

1. Add a `tsconfig.json` with `allowJs` enabled.
2. Rename shared utilities and API helpers to `.ts` first — they give the most value for the least effort.
3. Convert components gradually, starting with the most reused ones like buttons, inputs and layout components.
4. Turn on `strict` mode once most files are converted, and fix the remaining issues folder by folder.
5. Add `tsc --noEmit` to your CI pipeline so type errors block merging, just like failing tests.

## Conclusion

TypeScript is an investment that pays you back every time you refactor, onboard a new developer or read code you wrote six months ago. Start with strict mode, type your props and API responses, model state with discriminated unions, and let inference handle the rest. Within a few weeks, writing untyped React will feel like driving without a seatbelt.

Typed components are also much easier to optimize safely, because memoization depends on stable, predictable props. Read [10 Practical Tips to Speed Up Your React App](/blogs/react-performance-tips) next, or see how typed components fit into a consistent UI in [Building a Consistent Design System with Tailwind CSS](/blogs/tailwind-design-system).

Want a fast, type-safe React application built for your business? Have a look at my [portfolio](/portfolio) and [let's talk](/contact).
