# Backend MVP

API del agente conversacional dental para webhook de WhatsApp, routing de intentos, handoff policy y KPIs base.

## Endpoints

- `GET /health`
- `GET /webhook` (verificación Meta)
- `POST /webhook` (ingesta mensaje + ack)
- `GET /api/kpis` (KPIs para dashboard MVP)

## Variables de entorno

Copiar:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Variables relevantes:

- `PORT`
- `WHATSAPP_VERIFY_TOKEN`
- `LOW_CONFIDENCE_THRESHOLD`
- `GOOGLE_SHEET_ID`
- `GOOGLE_CALENDAR_ID`

## Ejecutar local

Desde la raíz del monorepo:

```bash
pnpm --filter @dental/backend dev
```

## Pruebas

```bash
pnpm --filter @dental/backend test
```

## Build

```bash
pnpm --filter @dental/backend build
pnpm --filter @dental/backend start
```
