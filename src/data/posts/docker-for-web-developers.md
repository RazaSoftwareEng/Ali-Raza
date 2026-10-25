Every developer has heard it, and most of us have said it: "But it works on my machine." The app runs perfectly on your laptop, then fails on a colleague's computer because they have a different Node.js version, or crashes on the server because a system library is missing. Docker exists to make that sentence obsolete.

Docker packages your application together with its runtime, dependencies and configuration into a single, portable unit called an **image**. That image runs the same way on your laptop, in your CI pipeline and on a production server. In this guide I explain the core concepts in plain language and walk through containerizing a real Node.js application, step by step. No prior DevOps experience required.

## What problem does Docker solve?

Modern applications depend on a lot more than their source code. A typical web app needs a specific language runtime, dozens or hundreds of packages, a database, perhaps a cache like Redis, environment variables, and sometimes operating-system libraries for things like image processing. Every one of those is a chance for environments to differ.

Before containers, teams tried to solve this with long setup documents, configuration-management scripts or full virtual machines. Setup documents go out of date. Virtual machines work, but each one runs an entire operating system, so they are heavy, slow to start and wasteful.

Containers take a lighter approach. They share the host machine's operating-system kernel but isolate everything else: the filesystem, processes, network and dependencies. A container starts in about a second, uses a fraction of the memory of a virtual machine, and behaves identically wherever it runs.

## Images and containers

Two terms come up constantly, and the difference between them matters:

- An **image** is a read-only template that describes everything your app needs: a base operating system layer, the runtime, your dependencies and your code. Think of it as a recipe, or a class in programming.
- A **container** is a running instance of an image. Think of it as a meal cooked from the recipe, or an object created from a class.

You build an image once, and you can start as many containers from it as you like — one on your laptop, three behind a load balancer in production. Images are stored in a **registry** such as Docker Hub or GitHub Container Registry, from which any machine can pull them.

Images are made of **layers**. Each instruction in a Dockerfile adds a layer, and Docker caches layers that have not changed. Understanding this caching is the key to fast builds, as you will see in a moment.

## Installing Docker

On Windows and macOS, install **Docker Desktop**, which includes the Docker engine, the command-line tools and Docker Compose. On Windows, enable the WSL 2 backend when prompted for much better performance. On Linux, install Docker Engine from your distribution's official repository. Check that everything works:

```bash
docker --version
docker run hello-world
```

If you see a welcome message, Docker downloaded a tiny image and started a container from it. You are ready to go.

## Your first Dockerfile

A **Dockerfile** is a plain text file of instructions that tells Docker how to build your image. Here is a clean, production-ready Dockerfile for a Node.js API:

```dockerfile
# 1. Start from an official, small base image
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only the dependency manifests first (better caching)
COPY package*.json ./

# 4. Install production dependencies exactly as locked
RUN npm ci --omit=dev

# 5. Copy the rest of the source code
COPY . .

# 6. Run as the non-root user that the Node image provides
USER node

# 7. Document the port and define the start command
EXPOSE 3000
CMD ["node", "server.js"]
```

The order of instructions is deliberate. Dependencies change much less often than source code, so copying `package.json` and running `npm ci` **before** copying the rest of the code means Docker can reuse the cached dependency layer on most builds. Change one line of code and the rebuild takes seconds instead of minutes.

Next to the Dockerfile, add a `.dockerignore` file so unnecessary or sensitive files never end up in the image:

```text
node_modules
npm-debug.log
.git
.env
dist
coverage
```

Now build and run it:

```bash
docker build -t clinic-api:1.0 .
docker run -d -p 3000:3000 --name clinic-api clinic-api:1.0
```

The `-t` flag tags the image with a name and version. In `docker run`, `-d` runs the container in the background and `-p 3000:3000` maps port 3000 on your machine to port 3000 inside the container. Open `http://localhost:3000` and your API is running in a container.

## Essential everyday commands

You only need a handful of commands for day-to-day work:

- `docker ps` — list running containers (`docker ps -a` includes stopped ones).
- `docker logs -f clinic-api` — follow a container's output, just like a terminal.
- `docker exec -it clinic-api sh` — open a shell inside a running container for debugging.
- `docker stop clinic-api` and `docker rm clinic-api` — stop and remove a container.
- `docker images` — list the images on your machine.
- `docker system prune` — clean up stopped containers, unused networks and dangling images.

## Running a full stack with Docker Compose

Real applications rarely consist of a single service. Your API probably needs a database, and maybe a cache. Starting each container by hand with the right flags quickly becomes tedious. **Docker Compose** lets you describe your entire stack in one file and start it with one command:

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/clinic
      REDIS_URL: redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: clinic
    volumes:
      - db-data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  db-data:
```

Run `docker compose up` and all three services start together on a private network. Notice that the API connects to the database using the hostname `db` — Compose gives every service a DNS name matching its service name. The named **volume** `db-data` keeps your database files safe even when the container is removed and recreated.

For a new team member, the entire setup process becomes: install Docker, clone the repository, run `docker compose up`. That alone often justifies adopting Docker.

## Development versus production

In development you want instant feedback when you save a file. Mount your source code into the container with a **bind mount** and run your dev server with hot reload. A separate `compose.override.yaml` file is a clean way to keep development settings apart from production:

```yaml
services:
  api:
    command: npm run dev
    volumes:
      - ./:/app
      - /app/node_modules
```

The second volume entry prevents your local `node_modules` from overwriting the one installed inside the container — a classic source of confusing errors, especially when your laptop and the container use different operating systems.

## Smaller, faster images with multi-stage builds

Frontend apps built with React and Vite are a perfect case for **multi-stage builds**. You need Node.js and all your dev dependencies to *build* the app, but the result is just static HTML, CSS and JavaScript that any web server can serve. A multi-stage Dockerfile uses one stage to build and a second, tiny stage to serve:

```dockerfile
# Stage 1: build the app
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve the static files
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

The final image contains only Nginx and your built files. Node.js, the source code and hundreds of megabytes of `node_modules` are left behind in the first stage. Smaller images download faster, start faster and have far fewer components that could contain security vulnerabilities.

## Best practices worth adopting early

1. **Use small, official base images.** Alpine or "slim" variants are a good default; pin a specific version rather than `latest` so builds are reproducible.
2. **Order instructions for caching.** Put things that change rarely near the top of the Dockerfile and your source code near the bottom.
3. **Never bake secrets into images.** Anyone with access to an image can read every file in it. Pass secrets at runtime through environment variables or your platform's secret manager.
4. **Run as a non-root user.** If an attacker ever compromises your app, a non-root user limits the damage they can do.
5. **One process per container.** Run your API and your database in separate containers so each can be scaled, updated and restarted independently.
6. **Add health checks.** A `HEALTHCHECK` instruction or an orchestrator probe that calls your `/health` endpoint lets the platform restart unhealthy containers automatically.
7. **Log to standard output.** Let Docker and your hosting platform collect logs instead of writing log files inside the container.
8. **Scan your images.** Tools like `docker scout` or Trivy report known vulnerabilities in your base image and dependencies.

## Docker in your CI/CD pipeline

Containers really shine once they are part of your delivery pipeline. On every merge to `main`, your CI system builds the image, runs the tests inside it, tags it with the commit hash and pushes it to a registry. Deployment then simply means telling a server or platform to run the new image. Because the exact same image moves from CI to staging to production, "it worked in testing" finally means something.

If your team does not have a CI pipeline yet, start with the lightweight setup I describe in [A Simple Git Workflow for Small Teams](/blogs/git-workflow-for-teams), then add a Docker build step to it.

From there, you can deploy containers to almost anywhere: a single VPS running Docker Compose, managed services such as AWS App Runner, Google Cloud Run, Azure Container Apps, Render or Fly.io, or, for larger systems, Kubernetes. Start simple — most applications never need Kubernetes.

## Common beginner mistakes

- **Copying everything before installing dependencies,** which breaks layer caching and makes every build slow.
- **Forgetting `.dockerignore`,** which bloats images and can leak `.env` files.
- **Storing data inside the container** instead of a volume, then losing it when the container is recreated.
- **Using `localhost` to reach another container.** Inside a container, `localhost` means the container itself; use the Compose service name instead.
- **Running everything in one giant container** because it feels simpler. It is simpler for a day and harder forever after.

## Next steps

You now know enough to containerize most web applications: write a Dockerfile with good layer ordering, add a `.dockerignore`, run your stack with Compose, slim your images with multi-stage builds and follow a few security basics. The best way to learn is to pick one of your existing projects and containerize it this week.

If the service you are containerizing is an API, make sure its design is solid too — [REST API Best Practices Every Developer Should Know](/blogs/rest-api-best-practices) covers the conventions I follow.

DevOps and deployment are part of the services I offer. You can see my experience on my [resume](/resume), browse the live projects in my [portfolio](/portfolio), or [reach out](/contact) to discuss getting your application containerized and deployed.
