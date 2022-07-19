import { body, param } from "express-validator";
import { Vehiculo } from "../database/schema";
import { validarCampos } from "../middlewares/middleware";
import { existeColor } from "./color.validator";
import { existeLinea, existeMarca } from './marca.validator';


const existeVehiculoActivo = async(id: string, eliminar?: boolean) => {
  const existe = await Vehiculo.findById(id);
  if(!existe) {
    throw new Error("El registro del vehículo no existe.");
  }
  if(!existe.estado) {
    throw new Error(`El registro del vehículo no se encuentra disponible para ${eliminar ? "eliminar" : "actualizar"}.`);
  }
}

export const existeLineaVehiculo = async(linea: string, vehiculoid: string, marca: string) => {
  try {
    if(marca) {
      // Se está actualizando la marca, buscar la linea dentro de esta
      await existeLinea(linea, marca);
    } else {
      // Se está actualizando solamente la línea, buscar en la marca que tiene el vehículo
      const item = await Vehiculo.findById(vehiculoid);
      await existeLinea(linea, item.marca.toString());
    }
  } catch(err) {
    throw err;
  }
}

const crearVehiculo = [
    body("marca").notEmpty().withMessage("La marca del vehículo es obligatoria.")
                  .custom( existeMarca ),
    body("linea").notEmpty().withMessage("La línea del vehículo es obligatoria.")
                  .custom((linea, {req}) => existeLinea(linea, req.body.marca)),
    body("modelo").notEmpty().withMessage("El modelo del vehículo es obligatorio."),
    body("color").notEmpty().withMessage("El color del vehículo es obligatorio.")
                  .isMongoId().withMessage("El identificador del color es inválido.")
                  .custom((color) => existeColor(null, color) ),
    body("novedades").notEmpty().withMessage("Las novedades del vehículo son obligatorias."),
    validarCampos,
  ];
  
const actualizarVehiculo = [
  param("id").notEmpty().withMessage("El identificador del vehículo es obligatorio.")
             .isMongoId().withMessage("El identificador del vehículo es inválido.")
             .custom((id) => {
              return existeVehiculoActivo(id);
             }),
  body("marca").notEmpty().withMessage("Si actualiza la marca del vehículo no debe estar vacía.")
               .custom( existeMarca ).optional({ nullable: true }),
  body("linea").notEmpty().withMessage("Si actualiza la línea del vehículo no debe estar vacía.")
               .custom((linea, {req}) => {
                 return existeLineaVehiculo(linea, req.params.id, req.body.marca);
               }).optional({ nullable: true }),
  body("modelo").notEmpty().withMessage("Si actualiza el modelo del vehículo no debe estar vacío.").optional({ nullable: true }),
  body("color").notEmpty().withMessage("Si actualiza el color del vehículo no debe estar vacío.")
               .isMongoId().withMessage("El identificador del color es inválido.")
               .custom((color) => existeColor(null, color) )
               .optional({ nullable: true }),
  body("novedades").notEmpty().withMessage("Si actualiza las novedades del vehículo no deben estar vacías.")
                   .optional({ nullable: true }),
  validarCampos,
];

const eliminarVehiculo = [
  param("id").notEmpty().withMessage("El identificador del vehículo es obligatorio.")
             .isMongoId().withMessage("El identificador del vehículo es inválido.")
             .custom((id) => {
              return existeVehiculoActivo(id, true);
             }),
  validarCampos
];

const Validator = {
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
};
export default Validator;
