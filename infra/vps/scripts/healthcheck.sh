#!/usr/bin/env bash
set -euo pipefail

HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:8080/health}"

RESPONSE="$(curl -fsS "$HEALTH_URL")"
echo "$RESPONSE"

echo "$RESPONSE" | grep -q '"ok":true' || {
  echo "[healthcheck] fallo" >&2
  exit 1
}

echo "[healthcheck] ok"
