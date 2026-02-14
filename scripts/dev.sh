#!/usr/bin/env bash
set -euo pipefail

pnpm --filter @dental/backend dev &
BACK_PID=$!

pnpm --filter @dental/frontend dev &
FRONT_PID=$!

cleanup() {
  kill "$BACK_PID" "$FRONT_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT
wait "$BACK_PID" "$FRONT_PID"
