#!/usr/bin/env bash
set -euo pipefail

pnpm -r lint
pnpm -r test
pnpm -r build

echo "Release checklist local completado."
