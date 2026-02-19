#!/usr/bin/env bash
set -euo pipefail
export PATH="$HOME/.bun/bin:$PATH"

cd "$(dirname "$0")/../test-apps/bun-app"

echo "Installing Bun test app dependencies..."
bun install --silent

echo ""
echo "Running Bun test app..."
bun run index.ts
