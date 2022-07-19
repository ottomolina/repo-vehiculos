import { Request, Response, Router } from "express";
const router = Router();

import ColorController from "../controllers/color.controller";
import Validator from "../validators/color.validator";

const Ctrl = new ColorController();

router.post("/", Validator.crearColor, async (req: Request, res: Response) => {
  const response = await Ctrl.agregarColor(req.body);
  return res.json(response);
});

router.get("/", async (req: Request, res: Response) => {
  const response = await Ctrl.listarColores();
  return res.json(response);
});

module.exports = router;
