#!/usr/bin/env bash
set -euo pipefail
export PATH="$HOME/.bun/bin:$PATH"

cd "$(dirname "$0")/../test-server"
echo "Starting Taskboard test server on port ${PORT:-8080}..."
exec bun run server.ts
