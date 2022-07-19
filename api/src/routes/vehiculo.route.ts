import { Request, Response, Router } from "express";
const router = Router();

import VehiculoController from "../controllers/vehiculo.controller";
import Validator from "../validators/vehiculo.validator";

const Ctrl = new VehiculoController();

router.post('/', Validator.crearVehiculo, async(req: Request, res: Response) => {
    const usuario = req.body.uid;
    const response = await Ctrl.crear(req.body, usuario);
    return res.json(response);
});

router.get("/", async (req: Request, res: Response) => {
    const response = await Ctrl.listar();
    return res.json(response);
});

router.put("/:id", Validator.actualizarVehiculo, async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Ctrl.actualizar(req.body, id);
    return res.json(response);
});

router.delete("/:id", Validator.eliminarVehiculo, async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Ctrl.eliminar(id);
    return res.json(response);
});
  
module.exports = router;
  