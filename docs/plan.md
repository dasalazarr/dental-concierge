# plan.md — Dental Concierge (Arquitectura y Prototipo)

## 1) Objetivo
Construir un MVP modular y escalable para agendamiento + seguimiento proactivo en clínicas dentales (WhatsApp first), listo para piloto en 4–8 semanas.

## 2) Arquitectura (modular)
**Canal / Entrada**
- WhatsApp Cloud API (webhook)
- Web form (opcional)

**Gateway / Orquestación**
- Clawdbot Gateway (instancia VPS)
- Agente: `dental-concierge`
- Tools: `create_appointment`, `reschedule`, `cancel`, `patient_profile`, `doctor_roster`, `send_reminder`, `follow_up`

**Servicios (API Backend)**
- Node.js (LTS) + Express
- Módulos:
  - `appointments` (agenda)
  - `patients` (CRM básico)
  - `doctors`
  - `notifications`
  - `analytics`

**Data Layer**
- PostgreSQL (Neon/Railway)
- Redis (colas y rate‑limit)

**Mensajería**
- WhatsApp Cloud API + templates
- Email (SendGrid) opcional

**Observabilidad**
- Logs estructurados
- Métricas: p95 latency, no‑show rate, confirm rate

## 3) Instancia de prototipo (misma key vs separada)
**Opción recomendada (segura):**
- Crear **nuevo agente** en el mismo Gateway (misma key), con workspace separado y bindings propios.
- Ventaja: reaprovechas infra y canal sin duplicar servidores.
- Riesgo controlado: aislamiento por agente + prefijos.

**No recomendado:**
- Reusar el mismo agente principal para prototipo → mezcla de contexto y confusión.

**Recomendación final:**
- Instancia **dental-concierge** dentro del mismo sistema, pero **agente y carpeta propia**.

## 4) Stack (últimas versiones, estable)
- Node.js 22 LTS
- Express 5.x
- Postgres 15+
- Redis 7+
- TypeScript 5.9
- Vitest 3.x
- Drizzle ORM (última stable)

## 5) Escalabilidad
- Separar `gateway` de `api` si crece
- Colas asíncronas para recordatorios
- Multi‑tenant (clinic_id en DB)

## 6) Roadmap MVP
- Semana 1–2: flujos y schema DB
- Semana 3–4: integración WA + recordatorios
- Semana 5–6: piloto real
- Semana 7–8: métricas + ajustes
