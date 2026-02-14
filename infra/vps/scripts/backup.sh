#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/dental-concierge}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/dental-concierge}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
OUT_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

sudo mkdir -p "$BACKUP_DIR"

sudo tar -czf "$OUT_FILE" \
  "$APP_DIR/apps/backend/.env" \
  "$APP_DIR/docs" \
  "$APP_DIR/tracking" \
  "$APP_DIR/data"

echo "[backup] generado: $OUT_FILE"
