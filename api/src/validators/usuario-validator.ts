import { Request } from "express";
import { check, CustomValidator, param } from "express-validator";
import { Usuario } from "../database/schema/";
import {
  esAdminRol,
  validarCampos,
} from "../middlewares/middleware";

const existeCorreo = async (correo: string) => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado.`);
  }
};

const existeUsuarioPorId = async (id: string) => {
  // Verificar que el usuario existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con id ${id} no está registrado.`);
  }
};

const validarIdVsToken: CustomValidator = async (id: string, { req }) => {
  if (id !== req.body.uid) {
    throw new Error("No puedes realizar esta acción.");
  }
};

const validatorCrearUsuario = [
  esAdminRol,
  check("nombres").notEmpty().withMessage("El nombre es obligatorio."),
  check("apellidos").notEmpty().withMessage("El apellido es obligatorio."),
  check("correo")
    .notEmpty()
    .withMessage("El correo es obligatorio.")
    .isEmail()
    .withMessage("El correo no es válido.")
    .custom(existeCorreo),
  validarCampos,
];

const validatorActualizarUsuario = [
  check("id").isMongoId().withMessage("No es un ID válido."),
  check("id").custom(existeUsuarioPorId),
  check("nombres")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("El nombre a actualizar no debe ir vacío."),
  check("apellidos")
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage("El apellido a actualizar no debe ir vacío."),
  validarCampos,
];

const validatorListarUsuarios = [esAdminRol, validarCampos];

const validatorActualizarContrasenia = [
  param("id").custom(validarIdVsToken),
  check("offset")
    .notEmpty()
    .withMessage("Debes enviar la nueva contraseña.")
    .isLength({ min: 8 })
    .withMessage("La nueva contraseña debe tener al menos 8 caracteres.")
    .isLength({ max: 32 })
    .withMessage("La nueva contraseña no debe tener más de 32 caracteres."),
  ...validatorActualizarUsuario,
];

// const validatorResetPassword = [
//     ...validatorActualizarUsuario
// ]

const validatorDesactivarUsuario = [
  check("id").isMongoId().withMessage("No es un ID válido."),
  check("id").custom(existeUsuarioPorId),
  validarCampos,
];

const validatorActivarUsuario = [
  esAdminRol,
  check("id").isMongoId().withMessage("No es un ID válido."),
  check("id").custom(existeUsuarioPorId),
  validarCampos,
];

const Validator = {
  validatorCrearUsuario,
  validatorActualizarUsuario,
  validatorListarUsuarios,
  validatorActualizarContrasenia,
  // validatorResetPassword,
  validatorDesactivarUsuario,
  validatorActivarUsuario,
};
export default Validator;
