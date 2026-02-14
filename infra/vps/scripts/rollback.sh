#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/dental-concierge}"
TARGET_REF="${1:-HEAD~1}"
SERVICE_NAME="${SERVICE_NAME:-dental-backend}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:8080/health}"

cd "$APP_DIR"

echo "[rollback] Checkout ref: $TARGET_REF"
git fetch --all --tags
git checkout "$TARGET_REF"

echo "[rollback] Rebuild backend"
pnpm install
pnpm --filter @dental/backend build

echo "[rollback] Restart service"
sudo systemctl restart "$SERVICE_NAME"
sudo systemctl status "$SERVICE_NAME" --no-pager

echo "[rollback] Healthcheck"
curl -fsS "$HEALTH_URL" >/dev/null

echo "[rollback] OK"
