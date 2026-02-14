export type Intent = "cita" | "tratamiento" | "precio" | "urgencia" | "fallback";

export interface IntentResult {
  intent: Intent;
  confidence: number;
  reason: string;
}

const rules: Array<{ intent: Exclude<Intent, "fallback">; keywords: string[]; confidence: number }> = [
  {
    intent: "urgencia",
    keywords: ["urgencia", "urgente", "dolor fuerte", "sangrado", "infeccion", "inflamacion", "trauma", "fiebre"],
    confidence: 0.95
  },
  {
    intent: "cita",
    keywords: ["cita", "agendar", "reservar", "turno", "disponibilidad", "horario", "appointment"],
    confidence: 0.9
  },
  {
    intent: "tratamiento",
    keywords: ["tratamiento", "ortodoncia", "implante", "endodoncia", "limpieza", "blanqueamiento", "caries"],
    confidence: 0.85
  },
  {
    intent: "precio",
    keywords: ["precio", "precios", "cuesta", "costo", "valor", "presupuesto", "tarifa"],
    confidence: 0.82
  }
];

export const classifyIntent = (text: string): IntentResult => {
  const normalized = text.toLowerCase().trim();

  if (!normalized) {
    return {
      intent: "fallback",
      confidence: 0.2,
      reason: "empty_message"
    };
  }

  // Priority order matters: urgency must win over any other match.
  for (const rule of rules) {
    const hasMatch = rule.keywords.some((keyword) => normalized.includes(keyword));

    if (hasMatch) {
      return {
        intent: rule.intent,
        confidence: rule.confidence,
        reason: `keyword_match:${rule.intent}`
      };
    }
  }

  return {
    intent: "fallback",
    confidence: 0.35,
    reason: "no_rule_match"
  };
};
