import express from "express";
import {
  startEvent,
  endEvent,
  getEventStatus,
  finalizeTeam
} from "../controllers/collect.controller.js";

const router = express.Router();

router.post("/start-event", startEvent);
router.post("/end-event", endEvent);
router.get("/status", getEventStatus);
router.post("/finalize-team/:team_name", finalizeTeam);

export default router;
