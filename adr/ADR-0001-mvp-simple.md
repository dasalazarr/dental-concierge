# ADR-0001: Arquitectura MVP Simple (Sheets-first)

- **Estado:** Aprobado
- **Fecha:** 2026-02-14
- **Contexto:** Se requiere entregar un MVP operable en 30 días para WhatsApp + citas + métricas.

## Decisión

Adoptar una arquitectura simple de monorepo con:

- Backend Node.js + TypeScript + Express.
- Frontend React + Vite.
- Persistencia operativa en Google Sheets.
- Agenda en Google Calendar.
- OpenClaw como operador/orquestador complementario.
- Deploy en VPS Ubuntu 24.04 con systemd + Nginx.

## Restricciones explícitas (MVP)

No usar en esta fase:

- Kubernetes.
- Milvus.
- NeMo.
- Microservicios avanzados.
- Multi-tenant.

## Consecuencias

- Ventaja: menor tiempo de entrega y menor costo operativo.
- Riesgo: límites de escalabilidad en volumen alto.
- Mitigación: registrar deuda técnica y plan post-MVP.

## Decisiones pospuestas (post-MVP)

- Migración a base de datos relacional gestionada.
- RAG avanzado con embeddings y reranking.
- Multi-tenant robusto.
- Guardrails clínicos enterprise.
