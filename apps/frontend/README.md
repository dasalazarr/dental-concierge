# Frontend MVP

Landing comercial + dashboard operativo MVP para Dental Concierge.

## Variables de entorno

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

Variables:

- `VITE_API_BASE_URL`: URL del backend.
- `VITE_WHATSAPP_LINK`: CTA para iniciar chat en WhatsApp.

## Ejecutar local

Desde la raíz:

```bash
pnpm --filter @dental/frontend dev
```

## Build

```bash
pnpm --filter @dental/frontend build
pnpm --filter @dental/frontend preview
```

## Prueba rápida

1. Abre `http://localhost:5173`.
2. Verifica CTA “Iniciar por WhatsApp”.
3. Verifica tarjetas KPI (fuente backend o mock).
