# Requerimientos No Funcionales MVP

## Rendimiento

- Objetivo TTFR P95: `< 60s`.
- API debe responder healthcheck de forma consistente.

## Confiabilidad

- Deploy reiniciable con systemd.
- Healthcheck posterior a deploy obligatorio.
- Rollback documentado.

## Seguridad

- No almacenar datos sensibles innecesarios en logs.
- Variables sensibles solo por entorno.
- HTTPS obligatorio en producción.

## Mantenibilidad

- Código TypeScript modular.
- Contratos e interfaces por componente.
- Documentación técnica y operativa versionada en Git.

## Escalabilidad (MVP consciente)

- Monorepo como fuente única de verdad.
- Diseño extensible sin sobrearquitectura.
- Decisiones complejas aplazadas vía ADR.
