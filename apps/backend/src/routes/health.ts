import { Router } from "express";
import { env } from "../config/env";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: env.serviceName,
    version: env.version,
    timestamp: new Date().toISOString()
  });
});

export default router;
