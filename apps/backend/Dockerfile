FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
RUN pnpm install --filter @dental/backend... --frozen-lockfile=false

COPY apps/backend apps/backend
WORKDIR /app/apps/backend
RUN pnpm build

EXPOSE 8080
CMD ["pnpm", "start"]
