import { check } from "express-validator";
import { Marca } from "../database/schema";
import { esAdminRol, validarCampos } from "../middlewares/middleware";


export const existeMarca = async (marca: string) => {
  const existe = await Marca.findOne({ marca });
  if(!existe) {
    throw new Error('La marca del vehículo no está registrada.');
  }
}

export const existeLinea = async (linea: string, marca: string) => {
  const item = await Marca.findOne({ marca });
  if(item && item.lineas.findIndex(e => e === linea) === -1) {
    throw new Error('La línea no se encuentra disponible en la marca.');
  }
}

export const esMarcaDuplicada = async (marca: string) => {
  const existe = await Marca.findOne({ marca });
  if(existe) {
    throw new Error('Esta marca ya está registrada.');
  }
}


const crearMarca = [
  esAdminRol,
  check("marca")
    .notEmpty()
    .withMessage("El nombre de la marca es obligatorio.")
    .custom( esMarcaDuplicada ),
  check("lineas")
    .notEmpty()
    .withMessage("Las líneas de la marca son obligatorias."),
  validarCampos,
];

const Validator = {
  crearMarca,
};
export default Validator;
