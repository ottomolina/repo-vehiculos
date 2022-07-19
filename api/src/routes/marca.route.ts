import { Request, Response, Router } from "express";
const router = Router();

import MarcaController from "../controllers/marca.controller";
import Validator from "../validators/marca.validator";

const Ctrl = new MarcaController();

router.post("/", Validator.crearMarca, async (req: Request, res: Response) => {
  const response = await Ctrl.agregarMarca(req.body);
  return res.json(response);
});

router.get("/", async (req: Request, res: Response) => {
  const response = await Ctrl.listarMarcas();
  return res.json(response);
});

module.exports = router;
