import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Usuario } from "../database/schema/";
import Util from "../util/util";
import { decodificarTokenSesion } from "../util/jwt";

export const validarJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return Util.enviarMensajeError(
        res,
        "Petición denegada, primero debes autenticarte.",
        false
      );
    }
    const id = decodificarTokenSesion(token);
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return Util.enviarMensajeError(
        res,
        "Petición denegada, primero debes autenticarte.",
        false
      );
    }
    const tokenOrm = usuario.tokens.find((el) => el.token === token);
    if (!tokenOrm) {
      return Util.enviarMensajeError(
        res,
        "Petición denegada, primero debes autenticarte.",
        false
      );
    }

    if (tokenOrm.fecha_fin !== null) {
      return Util.enviarMensajeError(
        res,
        "La sesión ha finalizado, por favor autentícate de nuevo.",
        false
      );
    }
    if (!tokenOrm.estado) {
      return Util.enviarMensajeError(
        res,
        "Petición denegada, primero debes autenticarte.",
        false
      );
    }
    req.body.uid = id;
    next();
  } catch (error) {
    if (String(error).indexOf("invalid token") > -1) {
      return Util.enviarMensajeError(
        res,
        "Petición denegada, primero debes autenticarte.",
        false
      );
    } else {
      return Util.enviarMensajeError(
        res,
        "La sesión ha finalizado, por favor autentícate de nuevo.",
        false
      );
    }
  }
};

export const esAdminRol = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.body;
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return Util.enviarMensajeError(
        res,
        "Tu usuario no tiene permiso para realizar esta acción."
      );
    }
    if (usuario.rol !== "ADMIN") {
      return Util.enviarMensajeError(
        res,
        "Tu usuario no tiene permiso para realizar esta acción."
      );
    }
    next();
  } catch (error) {
    return Util.enviarMensajeError(
      res,
      "Petición denegada, ocurrió un error de validación de permisos del usuario."
    );
  }
};

export const validarCampos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si vienen errores, entonces solo enviar el primero de la lista
    const error = errors.array()[0];
    return Util.enviarMensajeError(res, error.msg);
  }
  next();
};
