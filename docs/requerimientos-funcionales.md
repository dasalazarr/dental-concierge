# Requerimientos Funcionales MVP

## Backend

1. `GET /health` retorna estado del servicio con timestamp.
2. `GET /webhook` valida handshake de Meta usando verify token.
3. `POST /webhook` recibe mensajes y responde `ack`.
4. Clasificación de intentos inicial por reglas:
   - cita
   - tratamiento
   - precio
   - urgencia
   - fallback
5. Política de handoff:
   - urgencia => handoff obligatorio
   - baja confianza => handoff obligatorio
6. Exponer `GET /api/kpis` para dashboard MVP.
7. Registrar eventos en logs JSON.

## Frontend

1. Landing con propuesta de valor.
2. Botón “Iniciar por WhatsApp”.
3. Dashboard con KPIs:
   - TTFR
   - Handoff Rate
   - Resolución Autónoma
   - Leads/Semana
4. Consumir backend `/api/kpis` con fallback mock.

## Operación

1. Ejecutable local con comandos estándar.
2. Deploy básico a VPS con systemd + Nginx.
3. Runbook de incidentes y operación disponible.
