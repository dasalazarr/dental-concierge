#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/dental-concierge}"
BRANCH="${BRANCH:-main}"
SERVICE_NAME="${SERVICE_NAME:-dental-backend}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:8080/health}"

cd "$APP_DIR"

echo "[deploy] Fetch + checkout branch: $BRANCH"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "[deploy] Install + build"
pnpm install
pnpm --filter @dental/backend build

echo "[deploy] Restart service"
sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE_NAME"
sudo systemctl status "$SERVICE_NAME" --no-pager

echo "[deploy] Healthcheck"
curl -fsS "$HEALTH_URL" >/dev/null

echo "[deploy] OK"
