import type { IntentResult } from "./intent-router";

export interface HandoffDecision {
  handoff: boolean;
  reason: "urgency_detected" | "low_confidence" | "auto_resolved";
  priority: "high" | "normal";
}

export const evaluateHandoff = (result: IntentResult, threshold: number): HandoffDecision => {
  if (result.intent === "urgencia") {
    return {
      handoff: true,
      reason: "urgency_detected",
      priority: "high"
    };
  }

  if (result.confidence < threshold) {
    return {
      handoff: true,
      reason: "low_confidence",
      priority: "normal"
    };
  }

  return {
    handoff: false,
    reason: "auto_resolved",
    priority: "normal"
  };
};
