#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "[Setup] Installing npm dependencies..."
npm install

echo "[Setup] Complete."
