#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../test-apps/go-app"

echo "Tidying Go modules..."
go mod tidy

echo ""
echo "Running Go test app..."
go run .
