FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY apps/frontend/package.json apps/frontend/package.json
RUN pnpm install --filter @dental/frontend... --frozen-lockfile=false

COPY apps/frontend apps/frontend
WORKDIR /app/apps/frontend
RUN pnpm build

FROM nginx:1.27-alpine
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
