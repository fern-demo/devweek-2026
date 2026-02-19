# Taskboard — Fern Demo

A full Fern project demonstrating OpenAPI-based docs, SDK generation (Go + TypeScript), a test server, and test apps that exercise the generated SDKs.

## Project Structure

```
├── fern/
│   ├── fern.config.json        # Fern org config
│   ├── generators.yml          # SDK generator config (Go + TS, local output)
│   ├── docs.yml                # Docs site config with custom theming
│   ├── openapi/
│   │   └── openapi.yml         # Taskboard API — OpenAPI 3.1 spec
│   └── docs/pages/             # MDX documentation pages
├── sdks/
│   ├── go/                     # Generated Go SDK
│   └── typescript/             # Generated TypeScript SDK
├── test-server/
│   └── server.ts               # Bun server implementing the full API spec
├── test-apps/
│   ├── go-app/                 # Test app using the Go SDK
│   └── bun-app/                # Test app using the TypeScript SDK (Bun)
├── scripts/
│   ├── test-all.sh             # Run server + both test apps end-to-end
│   ├── run-server.sh           # Start the test server
│   ├── test-bun.sh             # Run the Bun/TypeScript test app
│   └── test-go.sh              # Run the Go test app
```

## Quick Start

### Prerequisites

- Node.js 18+
- [Fern CLI](https://buildwithfern.com) (`npm install -g fern-api`)
- [Bun](https://bun.sh) (`curl -fsSL https://bun.sh/install | bash`)
- [Go](https://go.dev) 1.21+

### 1. Generate SDKs

```bash
cd fern
fern generate --group go-sdk
fern generate --group ts-sdk
```

### 2. Run Everything

```bash
./scripts/test-all.sh
```

This starts the test server, runs the Bun test app, then the Go test app, and shuts down the server when done.

### Run Individually

Start the server in one terminal:
```bash
./scripts/run-server.sh
```

Then run either test app in another:
```bash
./scripts/test-bun.sh
./scripts/test-go.sh
```

### 3. Preview Docs

```bash
cd fern
fern docs dev
```

### 4. Publish Docs

```bash
cd fern
fern generate --docs
```

## API Overview

The Taskboard API is a task management REST API with:

| Resource   | Endpoints                          |
|-----------|-------------------------------------|
| **Tasks**  | List, Create, Get, Update, Delete  |
| **Projects** | List, Create, Get, Delete        |

Authentication via Bearer token. Full spec in `fern/openapi/openapi.yml`.
