# testforge-sample-app — Task Tracker API (TestForge fixture)

> ⚠️ **Deliberately insecure. Do not deploy.** This repository exists only as a
> test fixture for [TestForge](https://github.com/dkubeio/testforge). Every
> defect is planted on purpose and marked with a `SEEDED:` comment so testers
> can check what TestForge detects.

## Features

A small task-tracker backend:

| Feature | Where |
|---|---|
| Express REST API: tasks CRUD, stats, user search, login (JWT), file download, admin tools | `src/server.js`, `src/routes/*` |
| SQLite storage | `src/db.js` |
| Stats helpers with Vitest unit tests (partial coverage) | `src/lib/stats.js`, `tests/` |
| Static web UI | `public/index.html` |
| OpenAPI contract | `openapi.yaml` |
| Python FastAPI reports microservice | `services/py-reports/` |
| Container + Kubernetes manifests | `Dockerfile`, `k8s/deployment.yaml` |
| GitHub Actions CI | `.github/workflows/ci.yml` |

## Seeded defects (the test oracle)

| # | Defect | File | TestForge dimension |
|---|---|---|---|
| S1 | SQL injection (string concat) | `src/routes/tasks.js` | Security, OWASP |
| S2 | SQL injection (template literal) | `src/routes/users.js` | Security, OWASP |
| S3 | Command injection (`exec` + query string) | `src/routes/admin.js` | Security |
| S4 | `eval` of request body | `src/routes/admin.js` | Security |
| S5 | Path traversal (`fs.readFile` + `req.params`) | `src/routes/files.js` | Security |
| S6 | Hardcoded secrets | `src/config.js`, `k8s/deployment.yaml` | Security, Kubernetes |
| S7 | JWT without expiry, token in response | `src/routes/users.js` | Security |
| S8 | No helmet / no rate limiting | `src/server.js` | Security, Load, Agentic |
| S9 | Python SQLi / `shell=True` / path traversal | `services/py-reports/main.py` | Security (Python) |
| D1 | Vulnerable dependencies (express 4.17.1, lodash 4.17.15, jsonwebtoken 8.5.1, minimist 1.2.5) | `package.json`, `package-lock.json` | Supply Chain |
| D2 | Unused dependency (`minimist`) | `package.json` | Dead Code |
| D3 | Unused functions / module | `src/lib/stats.js`, `src/lib/unused-helpers.js` | Dead Code |
| Q1 | N+1 query in a loop | `src/routes/tasks.js` | N+1 Queries |
| Q2 | Division by zero / empty-array average | `src/lib/stats.js` | Edge Cases, Property-Based |
| Q3 | Partial unit-test coverage (2 tests) | `tests/stats.test.js` | Unit Tests, Mutation |
| Q4 | No try/catch, no global error handler, no graceful shutdown | `src/server.js` | Chaos |
| C1 | Documented-but-missing and undocumented routes | `openapi.yaml` | Contract |
| A1 | Missing `lang`, `img` without `alt`, unlabeled inputs, `div` as button | `public/index.html` | Accessibility |
| K1 | `privileged: true`, no limits, no probes, `:latest`, wildcard ClusterRole, NodePort | `k8s/deployment.yaml` | Kubernetes |
| K2 | Root user, unpinned `node:latest` base | `Dockerfile` | Kubernetes / Stack |

## Run locally

```bash
npm install
npm test     # 2 passing tests
npm start    # http://localhost:3000/health
```
