import express, { type NextFunction, type Request, type Response } from "express";
import { env } from "./config/env";
import healthRouter from "./routes/health";
import kpiRouter from "./routes/kpis";
import webhookRouter from "./routes/webhook";
import { logger, requestLogger } from "./services/logger";

export const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(requestLogger);

app.use("/health", healthRouter);
app.use("/webhook", webhookRouter);
app.use("/api/kpis", kpiRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ ok: false, error: "not_found" });
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  logger.error("request_error", {
    method: req.method,
    path: req.path,
    error: err instanceof Error ? err.message : "unknown_error"
  });

  res.status(500).json({ ok: false, error: "internal_error" });
});

if (require.main === module) {
  app.listen(env.port, () => {
    logger.info("service_started", {
      port: env.port,
      nodeEnv: env.nodeEnv
    });
  });
}
