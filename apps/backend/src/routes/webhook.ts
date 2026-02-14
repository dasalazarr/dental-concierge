import { Router } from "express";
import { env } from "../config/env";
import { GoogleCalendarService } from "../services/google-calendar";
import { GoogleSheetsService } from "../services/google-sheets";
import { evaluateHandoff } from "../services/handoff-policy";
import { classifyIntent } from "../services/intent-router";
import { logger } from "../services/logger";

interface IncomingWebhookMessage {
  from: string;
  text: string;
}

const router = Router();
const sheetsService = new GoogleSheetsService();
const calendarService = new GoogleCalendarService();

const extractMessage = (body: unknown): IncomingWebhookMessage => {
  // MVP parser: we only read the first incoming text message from Meta payload.
  const payload = body as {
    entry?: Array<{
      changes?: Array<{
        value?: {
          messages?: Array<{
            from?: string;
            text?: { body?: string };
          }>;
        };
      }>;
    }>;
  };

  const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  return {
    from: message?.from ?? "unknown",
    text: message?.text?.body ?? ""
  };
};

router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === env.whatsappVerifyToken && typeof challenge === "string") {
    logger.info("webhook_verified", { mode });
    return res.status(200).send(challenge);
  }

  logger.warn("webhook_verification_failed", {
    mode,
    tokenProvided: typeof token === "string"
  });

  return res.status(403).json({ ok: false, error: "verification_failed" });
});

router.post("/", async (req, res, next) => {
  try {
    const requestId = (res.locals.requestId as string | undefined) ?? "unknown";
    const incoming = extractMessage(req.body);

    logger.info("message_received", {
      requestId,
      phone: incoming.from,
      hasText: Boolean(incoming.text)
    });

    if (!incoming.text) {
      return res.json({
        ack: true,
        status: "ignored",
        reason: "no_text_message"
      });
    }

    const intent = classifyIntent(incoming.text);
    const handoff = evaluateHandoff(intent, env.lowConfidenceThreshold);

    logger.info("intent_classified", {
      requestId,
      phone: incoming.from,
      intent: intent.intent,
      confidence: intent.confidence
    });

    if (handoff.handoff) {
      logger.warn("handoff_triggered", {
        requestId,
        phone: incoming.from,
        reason: handoff.reason,
        priority: handoff.priority,
        channel: env.handoffChannel
      });
    }

    await sheetsService.appendConversationEvent({
      type: "intent_classified",
      phone: incoming.from,
      metadata: {
        intent: intent.intent,
        confidence: intent.confidence,
        handoff: handoff.handoff
      },
      createdAt: new Date().toISOString()
    });

    await sheetsService.appendLead({
      phone: incoming.from,
      intent: intent.intent,
      handoff: handoff.handoff,
      createdAt: new Date().toISOString()
    });

    const suggestedSlots =
      intent.intent === "cita" && !handoff.handoff
        ? await calendarService.checkAvailability(new Date().toISOString())
        : undefined;

    const response = {
      ack: true,
      intent: intent.intent,
      confidence: intent.confidence,
      handoff: handoff.handoff,
      handoffReason: handoff.reason,
      suggestedSlots
    };

    logger.info("response_sent", {
      requestId,
      phone: incoming.from,
      ack: true,
      handoff: handoff.handoff
    });

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
