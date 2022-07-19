import { check } from "express-validator";

import { validarCampos } from "../middlewares/middleware";

const validatorsLogin = [
  check("correo")
    .notEmpty()
    .withMessage("Debes enviar un correo.")
    .isEmail()
    .withMessage("El correo enviado no es válido."),
  check("offset").notEmpty().withMessage("Debes enviar la contraseña."),
  validarCampos,
];

const AuthValidators = {
  validatorsLogin,
};
export default AuthValidators;
