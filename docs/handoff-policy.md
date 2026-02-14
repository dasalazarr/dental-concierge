# Handoff Policy MVP

## Reglas activas

1. **Urgencia clínica detectada**
   - Condición: intención `urgencia`.
   - Acción: `handoff=true`, prioridad `high`.
2. **Baja confianza**
   - Condición: `confidence < LOW_CONFIDENCE_THRESHOLD`.
   - Acción: `handoff=true`, prioridad `normal`.
3. **Caso normal**
   - Condición: ninguna regla anterior aplica.
   - Acción: resolución automática.

## Señales de urgencia usadas por reglas

- `urgencia`, `urgente`, `dolor fuerte`, `sangrado`, `infeccion`, `inflamacion`, `trauma`, `fiebre`.

## Canal de handoff

- Variable `HANDOFF_CHANNEL` define canal operativo (ej. humano por WhatsApp/CRM).

## Mejora post-MVP

- Incorporar score semántico y validación clínica adicional.
