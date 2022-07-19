import { check } from "express-validator";
import { Color } from "../database/schema";
import { esAdminRol, validarCampos } from "../middlewares/middleware";


export const existeColor = async(color?: string, id?: string) => {
    let existe;
    if(id) {
        existe = await Color.findById(id);
    } else {
        existe = await Color.findOne({ color });
    }
    if(!existe) {
        throw new Error(`El color ${color} no está registrado.`)
    }
}

const esColorDuplicado = async(color: string) => {
    const existe = await Color.findOne({ color });
    if(existe) {
        throw new Error(`El color ${color} ya está registrado.`)
    }
}

const crearColor = [
  esAdminRol,
  check("color").notEmpty().withMessage("El nombre del color es obligatorio.")
                .custom(esColorDuplicado),
  validarCampos,
];

const Validator = {
  crearColor,
};
export default Validator;
