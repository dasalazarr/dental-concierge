import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    kpis: {
      ttfrSecondsP95: 42,
      handoffRate: 0.22,
      autonomousResolutionRate: 0.78,
      leadsPerWeek: 27
    },
    timestamp: new Date().toISOString()
  });
});

export default router;
