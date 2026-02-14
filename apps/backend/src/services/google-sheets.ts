import { env } from "../config/env";
import { logger } from "./logger";

export interface LeadRecord {
  phone: string;
  intent: string;
  handoff: boolean;
  createdAt: string;
}

export interface ConversationEvent {
  type: "message_received" | "intent_classified" | "handoff_triggered" | "response_sent";
  phone: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface GoogleSheetsConnector {
  appendLead(lead: LeadRecord): Promise<void>;
  appendConversationEvent(event: ConversationEvent): Promise<void>;
}

export class GoogleSheetsService implements GoogleSheetsConnector {
  async appendLead(lead: LeadRecord): Promise<void> {
    logger.info("google_sheets_append_lead", {
      sheetId: env.googleSheetId,
      lead
    });
  }

  async appendConversationEvent(event: ConversationEvent): Promise<void> {
    logger.info("google_sheets_append_event", {
      sheetId: env.googleSheetId,
      conversationEvent: event
    });
  }
}
