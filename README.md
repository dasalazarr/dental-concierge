# Dental Concierge MVP

Monorepo para un agente conversacional clínico dental con enfoque MVP:

- **Canal:** WhatsApp Cloud API (Meta)
- **Backend:** Node.js + TypeScript + Express
- **Frontend:** React + Vite
- **Operación de datos:** Google Sheets + Google Calendar
- **Orquestación complementaria:** OpenClaw
- **Infra:** VPS Ubuntu 24.04 (systemd + Nginx + TLS)

## Arquitectura resumida

```text
WhatsApp Cloud API -> Backend (webhook + intent router + handoff) -> Google Sheets/Calendar
                                      |
                                      -> Frontend Dashboard (KPIs)
                                      |
                                      -> OpenClaw (operación/orquestación complementaria)
```

## Quickstart (5 minutos)

1. Copiar variables de entorno:

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

2. Instalar dependencias:

```bash
make bootstrap
```

3. Levantar backend y frontend:

```bash
make dev
```

4. Validar servicios:

- Backend health: [http://localhost:8080/health](http://localhost:8080/health)
- Frontend: [http://localhost:5173](http://localhost:5173)

## Comandos útiles

```bash
make lint
make test
make build
```

## Variables de entorno

Variables base en `/.env.example`. Variables por app en:

- `/apps/backend/.env.example`
- `/apps/frontend/.env.example`

## Estructura principal

- `/apps/backend`: API webhook + router + conectores Google
- `/apps/frontend`: landing + dashboard MVP
- `/infra/vps`: despliegue VPS (systemd, nginx, scripts)
- `/docs`: arquitectura, contratos, seguridad, runbooks, ADR
- `/tracking`: OKR, bitácora, riesgos, estado semanal
- `/data`: esquema Sheets + base de conocimiento FAQ

## Estado de Definition of Done MVP

- Endpoints mínimos implementados: `/health`, `/webhook` GET/POST, `/api/kpis`
- Router de intentos inicial y política de handoff activa
- Logs JSON estructurados
- Frontend con landing + dashboard KPI
- CI mínima (lint, test, build) + deploy manual VPS
- Runbook de operación e incidentes documentado

## Roadmap de próximas fases

1. Persistencia formal (Postgres/Supabase) reemplazando Sheets-first.
2. RAG mejorado (embeddings + reranking) y evaluación automatizada.
3. Jobs de reporting semanal reales con integración por canal.
4. Observabilidad avanzada (dashboards y alertas automáticas).
5. Hardening de seguridad/compliance (DPA, retención y borrado automatizado).
