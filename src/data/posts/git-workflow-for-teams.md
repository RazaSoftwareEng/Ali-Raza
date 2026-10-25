Git is one of the most powerful tools in a developer's kit, and also one of the easiest to misuse. Without a shared workflow, small teams lose hours to merge conflicts, broken builds and the dreaded question, "Which branch has the latest version?" Large companies solve this with elaborate branching models and release managers. Small teams need something lighter: a handful of rules that everyone can remember, that keep the codebase healthy, and that do not slow anyone down.

This article describes the workflow I recommend for teams of two to ten developers. It is a simplified form of **trunk-based development** with pull requests, and it works equally well for client websites, internal tools and SaaS products.

## Why a workflow matters

A Git workflow is really an agreement about three things: where work happens, how it gets reviewed, and when it is released. When those are unclear, problems appear quickly:

- Long-lived branches drift away from `main` and become painful to merge.
- Untested code reaches production because nobody was sure who should test it.
- Hotfixes get lost because they were committed to a branch that never merged back.
- The history becomes so noisy that finding when a bug was introduced is impossible.

A good workflow makes the right behavior the default. You should not need to think hard about Git every day; it should fade into the background while you focus on building features.

## Rule 1: Keep main always deployable

The foundation of the whole workflow is a single rule: **`main` is always in a releasable state.** Anything merged into `main` has been reviewed, passes the automated checks, and could go to production today.

This sounds strict, but it is liberating. Anyone can start new work from `main` with confidence. Hotfixes are easy because there is no half-finished release in the way. And if you deploy automatically on every merge — which I strongly recommend — you get small, frequent releases that are far less risky than big ones.

Protect the branch in your Git hosting settings so this rule is enforced by tools, not memory:

- Require a pull request before merging; no direct pushes.
- Require at least one approving review.
- Require status checks (tests, lint, build) to pass.
- Require branches to be up to date with `main` before merging.

## Rule 2: Use short-lived feature branches

All work happens on a branch created from the latest `main`. Give branches descriptive names with a prefix that shows the type of work:

```bash
git switch main
git pull
git switch -c feature/appointment-reminders

# ...work and commit...

git push -u origin feature/appointment-reminders
```

Common prefixes are `feature/`, `fix/`, `chore/` and `docs/`. If you use an issue tracker, include the ticket number: `fix/142-invoice-total-rounding`.

The most important word in this rule is **short-lived**. Aim to merge every branch within one or two days. The longer a branch lives, the further it drifts from `main`, and the more painful and risky the merge becomes. If a feature is too large to finish in a couple of days, split it into smaller pieces that can each be merged safely — the next sections explain how.

### Stay in sync while you work

Pull changes from `main` into your branch regularly, at least once a day. Whether you rebase or merge is a team choice; what matters is consistency. I prefer rebasing private feature branches because it keeps history linear:

```bash
git fetch origin
git rebase origin/main
# resolve any conflicts, then
git push --force-with-lease
```

Always use `--force-with-lease` instead of `--force`. It refuses to overwrite the remote branch if someone else has pushed to it in the meantime, which prevents accidentally destroying a teammate's work.

### Resolve conflicts calmly

Conflicts are normal, not a sign that something went wrong. Git marks the conflicting sections, and your job is to decide what the combined result should be. Read both versions carefully, keep the intent of each change, run the tests, and only then continue the rebase. If a conflict touches code you do not understand, ask the person who wrote the other change — a two-minute conversation beats a silent bug.

## Rule 3: Keep pull requests small

Small pull requests are the single biggest improvement most teams can make. They get reviewed faster, they are reviewed more thoroughly, they are easier to revert, and they cause fewer conflicts. Research from several large engineering organizations points the same way: review quality drops sharply once a change grows beyond a few hundred lines.

A good pull request:

- Does **one thing** — a single feature slice, bug fix or refactor, never all three.
- Has a clear title and a description explaining **what** changed and **why**.
- Includes screenshots or a short recording for any visual change.
- Lists how it was tested and anything the reviewer should look at closely.
- Stays under roughly 400 lines of meaningful changes where possible.

Open the pull request early, even as a draft. It signals what you are working on, invites early feedback, and lets CI start checking your code from the first push.

### Shipping big features in small pieces

"But my feature is big" is the most common objection. The answer is to merge incomplete features safely. **Feature flags** let you merge code that is hidden from users until it is ready:

```js
const flags = {
  onlinePayments: import.meta.env.VITE_FLAG_ONLINE_PAYMENTS === 'true',
}

export function Checkout() {
  return (
    <>
      <OrderSummary />
      {flags.onlinePayments ? <OnlinePayment /> : <CashOnDelivery />}
    </>
  )
}
```

You can also build features "bottom-up": merge the database migration first, then the API endpoint, then the UI. Each step is small, reviewable and safe on its own.

## Rule 4: Review code like a teammate

Code review is not a gate to pass; it is a conversation that improves the code and spreads knowledge across the team. A few habits make reviews faster and kinder:

1. **Review within a few hours.** A pull request waiting two days for review destroys the benefits of short-lived branches.
2. **Automate the nitpicks.** Formatting and style should be handled by Prettier and ESLint, not by humans in comments.
3. **Focus on what matters:** correctness, security, readability, tests and whether the change fits the architecture.
4. **Ask, don't command.** "What happens if this list is empty?" invites discussion; "This is wrong" invites defensiveness.
5. **Label your comments.** Prefixes like `nit:`, `question:` and `blocking:` make it clear what must change before merging.
6. **Approve with suggestions.** If the remaining comments are minor, approve and trust your teammate to address them.

## Rule 5: Write commit messages that explain why

The code shows *what* changed. The commit message should explain *why*. Six months from now, when someone runs `git blame` on a confusing line, a good message saves them an hour of detective work.

Many teams adopt the **Conventional Commits** format, which keeps history scannable and enables automatic changelogs:

```text
feat: add SMS reminders for upcoming appointments
fix: round invoice totals to two decimal places
refactor: extract price calculation into a shared helper
docs: add local setup steps to README
chore: upgrade Vite to the latest minor version
```

Keep the subject line under about 72 characters, written in the imperative mood ("add", not "added"). If the change needs more context, leave a blank line and add a body explaining the reasoning, trade-offs or links to the issue.

When merging pull requests, **squash merging** is a good default for small teams: each pull request becomes one clean commit on `main`, and the messy "fix typo" commits from development disappear.

## Rule 6: Automate the boring parts

Humans are bad at remembering to run every check before every push. Machines are great at it. A continuous integration pipeline should run on every pull request and every push to `main`. With GitHub Actions, a basic pipeline for a JavaScript project takes a few lines:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

Add a deployment step — or connect the repository to Vercel or Netlify — so every merge to `main` goes live automatically, and every pull request gets its own preview URL. Preview deployments are a game changer for client work: designers and clients can review the real thing before it ships.

Once your build runs in CI, the natural next step is containerizing it so the same image runs in CI, staging and production. [Docker for Web Developers](/blogs/docker-for-web-developers) covers exactly that.

## Handling releases and hotfixes

With an always-deployable `main` and automatic deployments, "releases" mostly take care of themselves. For projects that need explicit versions — mobile apps, libraries, or software installed on client machines — tag releases on `main` with semantic version numbers:

```bash
git tag -a v1.4.0 -m "Release 1.4.0"
git push origin v1.4.0
```

Hotfixes follow the same flow as any other change: a `fix/` branch from `main`, a small pull request, a quick review and an automatic deploy. Because `main` never contains half-finished work, there is no need for a separate hotfix process.

## Useful habits and tools

- Add a `.gitignore` from day one so `node_modules`, build output and `.env` files never get committed.
- Use **pre-commit hooks** with Husky and lint-staged to format and lint changed files automatically.
- Learn `git bisect` — it finds the commit that introduced a bug by binary search, often in minutes.
- Use `git stash` to set aside unfinished work when you need to switch branches quickly.
- If a secret is ever committed, **rotate it immediately**. Removing it from history is not enough once it has been pushed.

## Summary

A healthy Git workflow for a small team comes down to six habits: keep `main` deployable, use short-lived branches, keep pull requests small, review like a teammate, write commit messages that explain why, and let automation handle the repetitive checks. None of these require special tools or a big process — just a shared agreement and a few minutes of setup.

The same habits apply to frontend performance work, where small, measurable changes beat big rewrites; I describe that approach in [10 Practical Tips to Speed Up Your React App](/blogs/react-performance-tips). You can find more about how I work on my [about page](/about), and my experience leading these practices on my [resume](/resume).
