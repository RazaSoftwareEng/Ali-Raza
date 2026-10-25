An API is a product, and the developers who call it are its users. A well-designed API is predictable, consistent and hard to misuse: once you have learned how one endpoint works, you can guess how the rest behave. A poorly designed one turns every integration into a support ticket, slows down every frontend that depends on it, and becomes harder to change with every new client.

Over the years I have built and consumed a lot of APIs — for e-commerce platforms, clinic management systems, point-of-sale software and mobile apps. The conventions below are the ones I now follow on every backend project. They are not tied to a particular framework; the examples use Node.js and Express, but the ideas apply equally to Django, Laravel, Spring or Go.

## Design around resources, not actions

REST is built on the idea of **resources** — the nouns of your domain, such as users, orders, products or appointments — and a small set of HTTP methods that act on them. The most common mistake is designing endpoints around actions instead:

```http
# Avoid: verbs in URLs
POST /api/createUser
GET  /api/getUserById?id=42
POST /api/deleteUser

# Prefer: nouns + HTTP methods
GET    /api/v1/users          # list users
POST   /api/v1/users          # create a user
GET    /api/v1/users/42       # get one user
PATCH  /api/v1/users/42       # update part of a user
DELETE /api/v1/users/42       # delete a user
```

A few naming rules keep things consistent:

- Use **plural nouns** for collections: `/users`, `/orders`, `/invoices`.
- Use **kebab-case** for multi-word paths: `/order-items`, not `/orderItems`.
- Express relationships through nesting, but only one level deep: `/users/42/orders` is clear; `/users/42/orders/7/items/3/reviews` is not.
- Pick one case style for JSON fields — usually `camelCase` for JavaScript clients — and never mix them.

### Use HTTP methods for what they mean

Each method carries a promise that clients, proxies and caches rely on. `GET` must never change data, which is what makes it safe to cache and retry. `PUT` replaces a whole resource and should be idempotent: sending the same request twice has the same effect as sending it once. `PATCH` updates only the fields provided. `POST` creates resources or triggers operations that do not fit the other methods, and `DELETE` removes them.

When an operation truly is an action — sending an invoice by email, for example — model it as a sub-resource rather than a verb in the path: `POST /api/v1/invoices/42/emails` reads naturally and keeps the URL structure consistent.

## Version from day one

Your first client will not be your last, and your first design will not be perfect. Versioning lets you evolve the API without breaking the apps that already depend on it. The simplest and most visible approach is a prefix in the path:

```js
import express from 'express'
import v1Router from './routes/v1/index.js'

const app = express()
app.use(express.json())
app.use('/api/v1', v1Router)
```

When you need a breaking change — renaming a field, changing a response shape, removing an endpoint — release it under `/api/v2` and keep `v1` running for a published deprecation period. Non-breaking changes, such as adding a new optional field or a new endpoint, do not need a new version.

## Return the right status codes

Status codes are the first thing a client checks, and they make your API self-describing. You do not need all sixty of them; this small set covers nearly every situation:

- `200 OK` — a successful read or update that returns data.
- `201 Created` — a resource was created; include a `Location` header pointing to it.
- `204 No Content` — success with nothing to return, typical for `DELETE`.
- `400 Bad Request` — the request is malformed or fails validation.
- `401 Unauthorized` — the client is not authenticated.
- `403 Forbidden` — the client is authenticated but not allowed to do this.
- `404 Not Found` — the resource does not exist.
- `409 Conflict` — the request conflicts with current state, such as a duplicate email.
- `422 Unprocessable Entity` — valid syntax but semantically invalid data (some teams use `400` for this too; just be consistent).
- `429 Too Many Requests` — the client hit a rate limit.
- `500 Internal Server Error` — something went wrong on the server.

Never return `200 OK` with an error message inside the body. It forces every client to parse the body to discover whether the request worked, and it breaks monitoring tools that rely on status codes.

## Use one consistent error format

Errors are part of your API's interface, and they deserve the same design attention as successful responses. Pick one shape and use it everywhere:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "details": [
      { "field": "email", "message": "Email is required" },
      { "field": "phone", "message": "Phone must be 11 digits" }
    ]
  }
}
```

The `code` is a stable, machine-readable identifier that clients can switch on. The `message` is for humans and can change. The optional `details` array lets a frontend show errors next to the right form fields. A central error-handling middleware makes this consistent automatically:

```js
app.use((err, req, res, next) => {
  const status = err.status ?? 500
  if (status === 500) console.error(err) // log internals, never send them
  res.status(status).json({
    error: {
      code: err.code ?? 'INTERNAL_ERROR',
      message: status === 500 ? 'Something went wrong.' : err.message,
      details: err.details,
    },
  })
})
```

Notice that unexpected errors return a generic message. Stack traces, SQL errors and file paths are useful to attackers and should only ever appear in your logs.

## Validate every input

Never trust data from the client — not the body, not the query string, not the headers. Validation protects your database from bad data, gives users helpful errors, and closes off a whole category of security issues. Schema libraries such as **Zod** or **Joi** let you declare the expected shape once and reuse it:

```js
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'staff']).default('staff'),
})

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return next({ status: 400, code: 'VALIDATION_ERROR', message: 'Invalid input', details: result.error.issues })
  }
  req.body = result.data
  next()
}
```

Validation also means rejecting fields you did not ask for. If a client can send `"role": "admin"` and have it saved, you have a privilege-escalation bug.

## Paginate, filter and sort collections

Any endpoint that returns a list will eventually return a very long list. Add pagination before you need it, because adding it later is a breaking change. There are two common approaches:

- **Offset pagination** (`?page=3&limit=20`) is simple and lets users jump to a specific page, but becomes slow on large tables and can skip or repeat items when data changes.
- **Cursor pagination** (`?limit=20&cursor=eyJpZCI6MTAwfQ`) uses an opaque pointer to the last item seen. It is fast and stable, which makes it ideal for feeds and infinite scrolling.

Return pagination metadata alongside the data so clients do not have to guess:

```json
{
  "data": [{ "id": 101, "name": "Ali" }],
  "meta": { "limit": 20, "nextCursor": "eyJpZCI6MTIwfQ", "hasMore": true }
}
```

For filtering and sorting, use simple, predictable query parameters such as `?status=paid&sort=-createdAt`, where a leading minus means descending. Document which fields can be filtered and sorted, and index those columns in your database.

## Secure every endpoint

Security cannot be added at the end; it has to be part of the design.

1. **Use HTTPS everywhere.** There are no exceptions in production.
2. **Authenticate with proven standards.** Short-lived JWT access tokens with refresh tokens, or secure HTTP-only session cookies, are both solid choices. Never invent your own scheme.
3. **Authorize on every request.** Being logged in is not enough; check that the user is allowed to access *this* specific record. Broken object-level authorization is the most common API vulnerability in the OWASP API Security Top 10.
4. **Rate limit** login, signup and other sensitive endpoints to slow down brute-force attacks.
5. **Configure CORS deliberately**, allowing only the origins that need access.
6. **Keep secrets out of code.** Load them from environment variables or a secret manager.

## Make it fast and observable

A good API is also a fast one. Select only the columns you need, avoid N+1 queries by loading related data in bulk, and add database indexes for every field you filter or sort by. Use HTTP caching headers such as `ETag` and `Cache-Control` for data that changes rarely, and consider a cache like Redis for expensive, frequently requested results.

Then make the API observable. Log every request with a correlation ID, track response times and error rates, and expose a simple `/health` endpoint for your load balancer and uptime monitoring. When something breaks at 2 a.m., good logs are the difference between a five-minute fix and a five-hour investigation.

Frontend performance depends heavily on the API behind it, too. Lean responses and no request waterfalls are two of the points I cover in [10 Practical Tips to Speed Up Your React App](/blogs/react-performance-tips).

## Document it as you build it

An undocumented API is an unusable API. The **OpenAPI** specification (formerly Swagger) is the industry standard: describe your endpoints once and you get interactive documentation, client code generation and contract testing. Many frameworks can generate the spec from your route definitions and validation schemas, so the documentation never drifts from the code.

Good documentation includes, for every endpoint: the purpose, authentication requirements, parameters, an example request, example success and error responses, and any rate limits. Add a short "getting started" guide that takes a new developer from zero to their first successful request in five minutes.

## Ship it consistently

Finally, think about how the API is built and deployed. Run your tests, linting and a schema check on every pull request, and deploy the same artifact to staging and production. Packaging the API in a container makes that much easier, because it runs identically everywhere — I walk through it step by step in [Docker for Web Developers](/blogs/docker-for-web-developers).

## Final thoughts

Great APIs feel boring in the best possible way: everything works exactly the way you expect. Resource-based URLs, honest status codes, one error format, strict validation, pagination and security by default will take you a very long way, whatever framework you choose.

If you are building the frontend for one of these APIs in TypeScript, sharing response types between backend and frontend removes a whole category of bugs — see [TypeScript Tips That Make React Code Safer](/blogs/typescript-tips-for-react).

You can see the kind of systems I build — including clinic management and POS billing software — in my [portfolio](/portfolio). If you need an API designed, built or reviewed, [contact me](/contact) and let's talk about your project.
