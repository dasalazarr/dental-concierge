const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toFloat = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  serviceName: "dental-concierge-backend",
  version: process.env.APP_VERSION ?? "0.1.0",
  port: toNumber(process.env.PORT, 8080),
  logLevel: process.env.LOG_LEVEL ?? "info",
  baseUrl: process.env.BASE_URL ?? "http://localhost:8080",
  whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN ?? "dev-verify-token",
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? "",
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? "",
  googleSheetId: process.env.GOOGLE_SHEET_ID ?? "",
  googleCalendarId: process.env.GOOGLE_CALENDAR_ID ?? "primary",
  googleServiceAccountJson: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "",
  handoffChannel: process.env.HANDOFF_CHANNEL ?? "human_whatsapp",
  lowConfidenceThreshold: toFloat(process.env.LOW_CONFIDENCE_THRESHOLD, 0.6)
};
