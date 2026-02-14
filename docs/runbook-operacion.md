# Runbook de Operación MVP

## Verificación diaria

1. `systemctl status dental-backend`
2. `curl -sS http://127.0.0.1:8080/health`
3. `journalctl -u dental-backend -n 100 --no-pager`
4. Revisar KPI semanal en dashboard.

## Incidente: webhook no responde

1. Verificar Nginx: `sudo systemctl status nginx`
2. Verificar backend: `sudo systemctl status dental-backend`
3. Revisar logs: `journalctl -u dental-backend -n 200 --no-pager`
4. Ejecutar healthcheck script.
5. Si persiste, rollback al último release estable.

## Incidente: handoff rate fuera de rango

1. Si `<10%`, revisar threshold de confianza.
2. Si `>35%`, revisar reglas de clasificación y datos de entrada.
3. Documentar acción en `tracking/BITACORA.md`.

## Reporte semanal (mínimo)

- TTFR P95
- Handoff rate
- Resolución autónoma
- Leads/semana
- Incidentes relevantes
