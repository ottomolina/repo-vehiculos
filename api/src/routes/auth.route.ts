import { Request, Response, Router } from "express";

import AuthValidators from "../validators/auth.validator";
import AuthController from "../controllers/auth.controller";

const Ctrl = new AuthController();

const router = Router();

router.post(
  "/login",
  AuthValidators.validatorsLogin,
  async (req: Request, res: Response) => {
    const response = await Ctrl.login(req.body);
    return res.json(response);
  }
);

router.post("/logout", async (req: Request, res: Response) => {
  const token = req.header("Authorization");
  const response = await Ctrl.logout(token);
  return res.json(response);
});

module.exports = router;
