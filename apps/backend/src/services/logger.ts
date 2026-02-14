import { randomUUID } from "crypto";
import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogPayload = {
  level: LogLevel;
  event: string;
  timestamp: string;
  service: string;
  version: string;
  [key: string]: unknown;
};

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

const minLevel = (env.logLevel in levelOrder ? env.logLevel : "info") as LogLevel;

const write = (level: LogLevel, event: string, data: Record<string, unknown> = {}): void => {
  if (levelOrder[level] < levelOrder[minLevel]) {
    return;
  }

  const payload: LogPayload = {
    level,
    event,
    timestamp: new Date().toISOString(),
    service: env.serviceName,
    version: env.version,
    ...data
  };

  process.stdout.write(`${JSON.stringify(payload)}\n`);
};

export const logger = {
  debug: (event: string, data?: Record<string, unknown>): void => write("debug", event, data),
  info: (event: string, data?: Record<string, unknown>): void => write("info", event, data),
  warn: (event: string, data?: Record<string, unknown>): void => write("warn", event, data),
  error: (event: string, data?: Record<string, unknown>): void => write("error", event, data)
};

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = req.header("x-request-id") ?? randomUUID();
  const startedAt = Date.now();

  res.locals.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  logger.info("request_received", {
    requestId,
    method: req.method,
    path: req.path
  });

  res.on("finish", () => {
    logger.info("request_finished", {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt
    });
  });

  next();
};
