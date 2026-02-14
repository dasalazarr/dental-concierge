# Observabilidad y KPIs MVP

## Logs estructurados

Formato JSON por evento:

- `request_received`
- `request_finished`
- `message_received`
- `intent_classified`
- `handoff_triggered`
- `response_sent`

Campos base:

- `timestamp`
- `service`
- `version`
- `event`
- `requestId`

## KPIs principales

1. TTFR (P95) objetivo `< 60s`.
2. Handoff rate objetivo `10% - 35%`.
3. Resolución autónoma objetivo `> 65%`.
4. Leads/semana: tracking continuo.

## Definition of Done de métricas

- Endpoint `/api/kpis` funcional.
- Dashboard frontend visualiza las cuatro métricas.
- Reporte semanal definido en runbook.
