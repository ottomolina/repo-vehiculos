import { Request, Response, Router } from "express";
const router = Router();

import Validator from "../validators/usuario-validator";
import UsuarioController from "../controllers/usuarios.controller";

const Ctrl = new UsuarioController();

router.post(
  "/",
  Validator.validatorCrearUsuario,
  async (req: Request, res: Response) => {
    const response = await Ctrl.crearUsuario(req.body);
    return res.json(response);
  }
);

router.get(
  "/",
  Validator.validatorListarUsuarios,
  async (req: Request, res: Response) => {
    const response = await Ctrl.listarUsuarios(req.query);
    return res.json(response);
  }
);

router.put(
  "/:id",
  Validator.validatorActualizarUsuario,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Ctrl.actualizarUsuario(req.body, id);
    return res.json(response);
  }
);

router.put(
  "/actualiza-contrasenia/:id",
  Validator.validatorActualizarContrasenia,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Ctrl.actualizarContrasenia(req.body, id);
    return res.json(response);
  }
);

// router.put('/reset-contrasenia/:id', Validator.validatorResetPassword, async (req: Request, res: Response) => {
//     Ctrl.resetPasswordUsuario();
// });

router.put(
  "/desactivar/:id",
  Validator.validatorDesactivarUsuario,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Ctrl.desactivarUsuario(id);
    return res.json(response);
  }
);

router.put(
  "/activar/:id",
  Validator.validatorActivarUsuario,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Ctrl.activarUsuario(id);
    return res.json(response);
  }
);

module.exports = router;
