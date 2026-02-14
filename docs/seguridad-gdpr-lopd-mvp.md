# Seguridad y Cumplimiento GDPR/LOPD (MVP)

## Principios MVP

1. Minimización de datos: almacenar solo lo necesario para operación.
2. Evitar PHI en logs libres.
3. Cifrado en tránsito (HTTPS/TLS obligatorio en producción).
4. Secretos fuera del repositorio.

## Controles implementados en MVP

- Variables sensibles por `.env` y entorno del servidor.
- Logs JSON sin contenido sensible completo del paciente.
- Handoff en casos de riesgo/ambigüedad para evitar respuestas inseguras.

## Pendientes post-MVP

- Política de retención automatizada.
- Flujo de derecho al olvido.
- DPA formal con proveedores externos.
