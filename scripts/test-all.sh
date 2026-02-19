#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PORT="${PORT:-8080}"
export PORT
export TASKBOARD_BASE_URL="http://localhost:${PORT}"

cleanup() {
  if [ -n "${SERVER_PID:-}" ]; then
    echo ""
    echo "Stopping test server (pid $SERVER_PID)..."
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo "============================================"
echo "  Taskboard SDK Integration Tests"
echo "============================================"
echo ""

echo "[1/3] Starting test server on port $PORT..."
"$SCRIPT_DIR/run-server.sh" &
SERVER_PID=$!
sleep 1

if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "ERROR: Server failed to start"
  exit 1
fi

echo "  Server started (pid $SERVER_PID)"
echo ""

echo "[2/3] Running Bun (TypeScript) test..."
echo "--------------------------------------------"
"$SCRIPT_DIR/test-bun.sh"
echo ""

echo "[3/3] Running Go test..."
echo "--------------------------------------------"
"$SCRIPT_DIR/test-go.sh"
echo ""

echo "============================================"
echo "  All integration tests passed!"
echo "============================================"
