import { Request, Response, Router } from "express";
import MonitorController from "../controllers/monitor.controller";

const Ctrl = new MonitorController();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const response = Ctrl.monitor();
  return res.json(response);
});

module.exports = router;
