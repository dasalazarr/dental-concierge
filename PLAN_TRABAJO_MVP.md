# PLAN_TRABAJO_MVP.md — Dental Concierge (WhatsApp + OpenClaw)

## 0) Contexto y objetivo

**Objetivo del MVP (30 días):**
Construir un sistema conversacional para clínicas dentales que opere por WhatsApp, permita agendamiento en Google Calendar, registre operación en Google Sheets, escale a humano por complejidad/urgencia y entregue reportes semanales con KPIs base.

**Estrategia:**
- Desarrollo local primero (rápido y controlado).
- Despliegue MVP en VPS actual (`clawdbot-vps`) con arquitectura liviana.
- Mantener complejidad enterprise fuera del MVP.

---

## 1) Alcance del MVP

### 1.1 Incluye
1. WhatsApp Cloud API (inbound/outbound).
2. Motor conversacional con OpenClaw como orquestador.
3. Clasificación de intenciones:
   - cita
   - información de tratamientos
   - precios orientativos
   - urgencia
   - otros
4. Escalado humano por reglas de seguridad.
5. Integración Google Calendar (consulta de disponibilidad y creación de cita).
6. Integración Google Sheets (leads, estado conversación, KPIs).
7. Base de conocimiento inicial (RAG básico curado con documentos de clínica).
8. Dashboard operativo (Looker Studio o panel web simple).
9. Reporte semanal automático de indicadores.

### 1.2 No incluye (fase posterior)
- Diagnóstico médico automatizado.
- Multi-tenant robusto.
- RAG híbrido + reranking avanzado.
- Guardrails enterprise (NeMo) en profundidad.
- Cumplimiento HIPAA completo (si no aplica mercado US).

---

## 2) Arquitectura objetivo del MVP

## 2.1 Vista general
1. **Canal**: WhatsApp Cloud API (Meta).
2. **Backend API**: servicio Node.js (webhook, reglas, conectores).
3. **Orquestación**: OpenClaw (enrutamiento y herramientas).
4. **Datos**: Google Sheets (operación) + Google Calendar (citas).
5. **Conocimiento**: documentos curados para respuestas orientativas.
6. **Frontend**: landing + panel de métricas MVP.
7. **Infra**: VPS actual para backend/orquestador/panel.

## 2.2 Decisiones técnicas del MVP
- **Sheets first** para velocidad de ejecución.
- **Escalado humano obligatorio** para urgencia/ambigüedad.
- **Logs JSON** desde día 1.
- **Mensajería segura**: sin datos sensibles innecesarios en texto libre.

---

## 3) Workstreams separados (Backend / Frontend)

## 3.1 Backend

### Módulos
1. **Webhook WhatsApp**
   - Verificación token de Meta
   - Inbound parser
   - Outbound sender
2. **Router de intenciones**
   - Reglas + LLM fallback
   - score de confianza
3. **Policy Engine (seguridad clínica)**
   - Frases permitidas/prohibidas
   - detector básico de urgencia
   - política de handoff
4. **Conectores**
   - Google Sheets API
   - Google Calendar API
5. **RAG básico**
   - ingesta de docs
   - retrieval simple
   - respuestas con fuente interna
6. **Reporting**
   - job semanal (cron)
   - resumen de KPIs
7. **Observabilidad**
   - logs estructurados
   - métricas de latencia y conversión

### Endpoints mínimos sugeridos
- `GET /health`
- `GET /webhook` (Meta verify)
- `POST /webhook` (inbound WhatsApp)
- `POST /api/handoff`
- `GET /api/kpis?range=week`

### Eventos clave a registrar
- message_received
- intent_classified
- handoff_triggered
- appointment_requested
- appointment_confirmed
- response_sent

## 3.2 Frontend

### Módulos
1. **Landing comercial**
   - propuesta de valor
   - CTA “Iniciar por WhatsApp”
2. **Panel operativo MVP**
   - total conversaciones
   - tasa de conversión a cita
   - handoff rate
   - tiempo de primera respuesta
3. **Vista de reportes semanales**
   - indicadores y tendencia

### Requisitos UX
- mobile-first
- carga rápida
- foco en métricas accionables (no decoración)

---

## 4) Infraestructura (local + VPS)

## 4.1 Desarrollo local

### Requisitos de máquina dev
- Node.js 20+
- npm o pnpm
- ngrok/cloudflared (para exponer webhook local)
- acceso a Meta Developer + Google APIs

### Variables de entorno base
- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `OPENAI_API_KEY` o proveedor elegido
- `GOOGLE_SERVICE_ACCOUNT_JSON` (o path)
- `GOOGLE_SHEET_ID`
- `GOOGLE_CALENDAR_ID`
- `HANDOFF_CHANNEL` (email/whatsapp/humano)

## 4.2 VPS actual para MVP

**Host:** clawdbot-vps (2GB RAM, 1vCPU, Ubuntu 24.04)

### Uso recomendado
- Backend API + OpenClaw + frontend ligero.
- Evitar cargas pesadas simultáneas (builds + indexing + jobs intensos).

### Despliegue sugerido
- 1 servicio systemd para backend
- OpenClaw ya como servicio systemd
- reverse proxy (Nginx/Caddy) opcional
- TLS obligatorio para webhook público

### Backups mínimos
- dump diario de configuración
- backup semanal de logs operativos y snapshots de Sheets (export)

---

## 5) Plan de trabajo detallado (4 semanas)

## Semana 1 — Fundaciones y conectividad

### Backend
- [ ] Configurar repo, estructura base y estándares (lint/format).
- [ ] Implementar `GET/POST /webhook` para Meta.
- [ ] Conector outbound WhatsApp.
- [ ] Healthcheck + logging JSON.

### Frontend
- [ ] Landing base + CTA WhatsApp.
- [ ] Wireframe panel de métricas.

### Infra
- [ ] Definir `.env.example`.
- [ ] Exponer webhook de dev (ngrok) y validar handshake Meta.

**DoD semana 1:** mensaje entra por WhatsApp y se responde eco controlado.

## Semana 2 — Lógica de negocio y agendamiento

### Backend
- [ ] Router de intenciones.
- [ ] Reglas de urgencia y handoff.
- [ ] Integración Google Calendar (slots + create event).
- [ ] Integración Google Sheets (logs operativos y leads).

### Frontend
- [ ] Panel MVP con lectura de KPIs desde API/sheet.

**DoD semana 2:** flujo end-to-end conversación -> intención -> acción (cita/handoff).

## Semana 3 — RAG básico y calidad conversacional

### Backend
- [ ] Ingesta de documentos curados de clínica.
- [ ] Retrieval básico para FAQs y respuestas orientativas.
- [ ] Mensajes de seguridad/legal en respuestas sensibles.
- [ ] Testing con dataset de 20 escenarios.

### Frontend
- [ ] Vista de casos/errores para revisión rápida.

**DoD semana 3:** respuestas útiles en FAQs y escalado correcto en urgencias.

## Semana 4 — Reporting, hardening y salida a MVP

### Backend
- [ ] Job semanal de reporte automático.
- [ ] Métricas finales: conversión, handoff, latencia.
- [ ] Hardening básico (rate limit, validaciones, retries).

### Frontend
- [ ] Panel estable para operación semanal.
- [ ] Ajustes de UX final.

### Infra
- [ ] Deploy en VPS.
- [ ] Smoke tests de producción.
- [ ] Runbook de incidentes.

**DoD semana 4:** MVP operable con reporte semanal y dashboard funcional.

---

## 6) Criterios de aceptación del MVP

1. WhatsApp operativo en producción.
2. Escalado humano funciona por reglas de urgencia/complejidad.
3. Citas se registran en Google Calendar.
4. Datos operativos se escriben en Google Sheets.
5. Dashboard muestra KPIs clave.
6. Reporte semanal se genera automáticamente.
7. 0 incidentes críticos de seguridad en piloto interno.

---

## 7) KPI objetivo del piloto

- Tiempo de primera respuesta: `< 60s`.
- Conversión conversación -> cita: `+10%` sobre baseline.
- Handoff rate saludable: `10% a 35%`.
- Disponibilidad operativa del bot: `> 99% horario de atención`.

---

## 8) Riesgos y mitigaciones

1. **Riesgo**: respuestas inseguras en salud.
   - **Mitigación**: límites estrictos + handoff temprano.
2. **Riesgo**: sobrecarga de VPS.
   - **Mitigación**: arquitectura liviana, sin componentes pesados en paralelo.
3. **Riesgo**: calidad de datos inconsistente en Sheets.
   - **Mitigación**: esquema fijo y validaciones.
4. **Riesgo**: retraso por sobrearquitectura.
   - **Mitigación**: congelar scope MVP.

---

## 9) Equipo y responsabilidades

### Backend Lead
- webhook, router, policy engine, conectores, reporting

### Frontend Lead
- landing, panel KPI, experiencia de operación

### AI/Prompt Engineer
- guías de respuesta, RAG curado, evaluación de calidad

### DevOps/Infra
- despliegue VPS, seguridad básica, monitoreo, backups

### Product Owner
- alcance, priorización, validación con clínica piloto

---

## 10) Roadmap post-MVP (fase 2)

1. Migración de Sheets -> Postgres/Supabase.
2. Búsqueda híbrida + reranking.
3. Guardrails avanzados.
4. Multi-clínica (tenant-aware).
5. Auditoría y cumplimiento reforzado.

---

## 11) Instrucción final al equipo

**Prioridad absoluta:** entregar valor clínico-operativo medible en 30 días.
No se aprueban cambios que aumenten complejidad sin mejorar KPIs del piloto.
