import { ObjectId } from "mongoose";

export interface IVehiculo {
  marca: String;
  linea: String;
  modelo: String;
  color: ObjectId;
  estado: boolean;
  fecha_creado: Date;
  usuario: ObjectId;
  novedades: String;
}
