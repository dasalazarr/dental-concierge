#!/usr/bin/env bash
set -euo pipefail

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm no está instalado. Instala pnpm >= 9 y vuelve a ejecutar." >&2
  exit 1
fi

pnpm install
