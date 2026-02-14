# Schema Google Sheets MVP

## Hoja `leads`

| Columna | Tipo | Descripción |
|---|---|---|
| created_at | datetime ISO | Fecha de ingreso |
| phone | string | Teléfono del paciente |
| intent | string | Intento detectado |
| handoff | boolean | Escalado a humano |
| status | string | nuevo / en_proceso / cerrado |

## Hoja `eventos`

| Columna | Tipo | Descripción |
|---|---|---|
| created_at | datetime ISO | Fecha del evento |
| event_type | string | message_received, intent_classified, etc. |
| phone | string | Teléfono |
| request_id | string | Correlación de logs |
| metadata_json | json string | Contexto del evento |

## Hoja `kpis_weekly`

| Columna | Tipo |
|---|---|
| week_start | date |
| ttfr_p95_seconds | number |
| handoff_rate | number |
| autonomous_resolution_rate | number |
| leads_per_week | number |
