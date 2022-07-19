import { Schema, model, SchemaTypes } from "mongoose";
import { IToken, IUsuario } from "../../interface/IUsuario";

const TokenSchema = new Schema<IToken>({
  token: {
    type: SchemaTypes.String,
    required: [true, "El campo token es requerido."],
  },
  fecha_inicio: {
    type: SchemaTypes.Date,
    required: [true, "La fecha del token es requerida."],
  },
  fecha_fin: {
    type: SchemaTypes.Date,
    default: null,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

const UsuarioSchema = new Schema<IUsuario>({
  nombres: {
    type: SchemaTypes.String,
    required: [true, "El campo nombres es obligatorio."],
  },
  apellidos: {
    type: SchemaTypes.String,
    required: [true, "El campo apellidos es obligatorio."],
  },
  correo: {
    type: SchemaTypes.String,
    required: [true, "El campo correo es obligatorio."],
    unique: true,
  },
  offset: {
    type: SchemaTypes.String,
    required: [true, "El campo contraseña es obligatorio."],
  },
  rol: {
    type: SchemaTypes.String,
    default: "USER",
  },
  estado: {
    type: SchemaTypes.Boolean,
    default: true,
  },
  fecha: {
    type: SchemaTypes.Date,
    required: [true, "La fecha de creación es obligatoria."],
  },
  tokens: {
    type: [TokenSchema],
    default: [],
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, offset, ...usuario } = this.toObject();
  usuario.id = _id;
  return usuario;
};

const Usuario = model<IUsuario>("Usuario", UsuarioSchema);
export default Usuario;
