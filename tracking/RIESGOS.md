# Riesgos Abiertos MVP

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Integración real Google APIs no completada | Media | Alta | Mantener interfaces listas y cerrar credenciales primero |
| R2 | Cambios de payload WhatsApp no controlados | Baja | Media | Validar y endurecer parser de webhook |
| R3 | Sobrecarga de VPS en picos | Media | Media | Monitorear y escalar verticalmente si TTFR sube |
| R4 | Calidad de clasificación por reglas limitada | Alta | Media | Ajustar reglas y dataset de validación semanal |
| R5 | Dependencia operativa de deploy manual | Media | Media | Consolidar pipeline de deploy con checks post-deploy |
