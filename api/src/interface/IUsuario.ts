import { ObjectId } from "mongoose";

export interface IUsuario {
  nombres: string;
  apellidos: string;
  correo: string;
  offset?: string;
  rol: string;
  estado: boolean;
  fecha: Date;
  tokens?: Array<IToken>;
}

export interface IToken {
  id?: ObjectId;
  token: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: boolean;
}
