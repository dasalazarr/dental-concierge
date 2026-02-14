# Arquitectura MVP

## Objetivo

Transformar conversación de WhatsApp en acción operativa (cita o handoff) con métricas medibles.

## Vista de componentes

```text
WhatsApp Cloud API -> Backend Webhook (Express)
                             |
                             +-> Intent Router + Handoff Policy
                             +-> Google Sheets Connector
                             +-> Google Calendar Connector
                             +-> KPI endpoint (/api/kpis)

Frontend (Vite React) -> Landing + Dashboard KPI
OpenClaw -> Operación/orquestación complementaria (fuera del core API)
```

## Flujo principal

1. Paciente envía mensaje por WhatsApp.
2. Meta envía webhook a `POST /webhook`.
3. Backend clasifica intención (`cita`, `tratamiento`, `precio`, `urgencia`, `fallback`).
4. Handoff policy decide si escalar a humano.
5. Se registran eventos en Google Sheets (implementación base).
6. Si aplica cita, se consultan slots en Google Calendar (implementación base).
7. API responde `ack` estructurado.

## Escalabilidad MVP

- Modularidad por servicios (router, policy, conectores).
- Contratos de interfaces listos para reemplazar stubs por clientes reales Google.
- Monorepo permite evolución coordinada de backend/frontend/infra.
