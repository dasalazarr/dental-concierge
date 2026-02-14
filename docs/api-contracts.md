# API Contracts MVP

## `GET /health`

### 200 OK

```json
{
  "ok": true,
  "service": "dental-concierge-backend",
  "version": "0.1.0",
  "timestamp": "2026-02-14T18:00:00.000Z"
}
```

## `GET /webhook` (Meta Verify)

### Query params

- `hub.mode=subscribe`
- `hub.verify_token=<token>`
- `hub.challenge=<string>`

### 200 OK

Respuesta plana con el contenido de `hub.challenge`.

### 403

```json
{ "ok": false, "error": "verification_failed" }
```

## `POST /webhook`

### Request (simplificado)

```json
{
  "entry": [
    {
      "changes": [
        {
          "value": {
            "messages": [
              {
                "from": "573000000000",
                "text": { "body": "Quiero una cita" }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

### 200 OK

```json
{
  "ack": true,
  "intent": "cita",
  "confidence": 0.9,
  "handoff": false,
  "handoffReason": "auto_resolved",
  "suggestedSlots": []
}
```

## `GET /api/kpis`

### 200 OK

```json
{
  "ok": true,
  "kpis": {
    "ttfrSecondsP95": 42,
    "handoffRate": 0.22,
    "autonomousResolutionRate": 0.78,
    "leadsPerWeek": 27
  },
  "timestamp": "2026-02-14T18:00:00.000Z"
}
```
