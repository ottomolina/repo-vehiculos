import { Request, Response } from "express";
import { validarJWT } from "./middleware";
import { routes } from "../routes/rutas";

export const interceptor = async (req: Request, res: Response, next: any) => {
  const path = req.originalUrl;

  let rutas = routes.filter((e) => path.includes(e.path));
  if (rutas.length === 0) {
    return res
      .status(404)
      .json({ codigo: 1, mensaje: "404 | Servicio no encontrado." });
  }
  const ruta = rutas[0];
  if (ruta.subpath.length !== 0) {
    // Buscar en las subrutas
    let url = path;
    // Si es una peticion put o delete quitar el id para validar
    if (req.method === "DELETE" || req.method === "PUT") {
      const e = path.split("/");
      const i = path.indexOf(e[e.length - 1]);
      url = path.substring(0, i - 1);
    }
    const index = ruta.subpath.findIndex((e) => `${ruta.path}${e}` === url);
    if (index === -1) {
      return res
        .status(404)
        .json({ codigo: 1, mensaje: "404 | Servicio no encontrado." });
    }
  }
  if (!ruta.protected && !path.includes("/auth/logout")) {
    // Si la ruta no está protegida y no es la del endpoint de desloguearse
    // dejar continuar sin validar jwt
    return next();
  } else {
    validarJWT(req, res, next);
  }
};
