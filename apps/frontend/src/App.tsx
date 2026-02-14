import { useEffect, useMemo, useState } from "react";

interface KpiResponse {
  ok: boolean;
  kpis: {
    ttfrSecondsP95: number;
    handoffRate: number;
    autonomousResolutionRate: number;
    leadsPerWeek: number;
  };
  timestamp: string;
}

const mockKpis: KpiResponse = {
  ok: true,
  kpis: {
    ttfrSecondsP95: 45,
    handoffRate: 0.2,
    autonomousResolutionRate: 0.8,
    leadsPerWeek: 21
  },
  timestamp: new Date().toISOString()
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const whatsappLink = import.meta.env.VITE_WHATSAPP_LINK ?? "https://wa.me/15550000000";

export const App = (): JSX.Element => {
  const [data, setData] = useState<KpiResponse>(mockKpis);
  const [source, setSource] = useState<"backend" | "mock">("mock");

  useEffect(() => {
    const run = async (): Promise<void> => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/kpis`);
        if (!response.ok) {
          throw new Error(`status_${response.status}`);
        }

        const payload = (await response.json()) as KpiResponse;
        setData(payload);
        setSource("backend");
      } catch {
        // Keep dashboard usable even if backend is down in local demos.
        setData(mockKpis);
        setSource("mock");
      }
    };

    void run();
  }, []);

  const cards = useMemo(
    () => [
      { label: "TTFR (P95)", value: `${data.kpis.ttfrSecondsP95}s`, target: "< 60s" },
      { label: "Handoff Rate", value: `${Math.round(data.kpis.handoffRate * 100)}%`, target: "10-35%" },
      { label: "Resolución Autónoma", value: `${Math.round(data.kpis.autonomousResolutionRate * 100)}%`, target: "> 65%" },
      { label: "Leads / Semana", value: String(data.kpis.leadsPerWeek), target: "Tracking" }
    ],
    [data]
  );

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Dental Concierge</p>
        <h1>Convierte conversaciones de WhatsApp en citas dentales.</h1>
        <p>
          Atención inicial automatizada, escalado a humano cuando corresponde y métricas operativas para controlar
          conversión, calidad y tiempos de respuesta.
        </p>
        <a className="cta" href={whatsappLink} target="_blank" rel="noreferrer">
          Iniciar por WhatsApp
        </a>
      </section>

      <section className="dashboard">
        <header>
          <h2>Dashboard MVP</h2>
          <p>Fuente de datos: {source === "backend" ? "Backend /api/kpis" : "Mock local"}</p>
        </header>

        <div className="kpi-grid">
          {cards.map((card) => (
            <article className="kpi-card" key={card.label}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <small>Objetivo: {card.target}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
