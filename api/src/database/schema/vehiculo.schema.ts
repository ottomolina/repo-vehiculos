import { Schema, model, SchemaTypes } from "mongoose";
import { IVehiculo } from "../../interface/IVehiculo";

const VehiculoSchema = new Schema<IVehiculo>({
  marca: {
    type: SchemaTypes.String,
    required: [true, "La marca es obligatoria."],
  },
  linea: {
    type: SchemaTypes.String,
    required: [true, "La línea es obligatoria."],
  },
  modelo: {
    type: SchemaTypes.String,
    required: [true, "La modelo del vehículo es obligatorio."],
  },
  color: {
    type: SchemaTypes.ObjectId,
    ref: "color",
    required: [true, "El color del vehículo es obligatorio."],
  },
  estado: {
    type: SchemaTypes.Boolean,
    default: true,
  },
  fecha_creado: {
    type: SchemaTypes.Date,
    required: [
      true,
      "La fecha de creación del registro del vehículo es obligatoria.",
    ],
  },
  usuario: {
    type: SchemaTypes.ObjectId,
    ref: "usuario",
    required: [true, "El usuario asignado es obligatorio."],
  },
  novedades: {
    type: SchemaTypes.String,
    required: [true, "El texto de novedades del vehículo es obligatorio."],
  },
});

VehiculoSchema.methods.toJSON = function () {
  const { __v, _id, ...vehiculo } = this.toObject();
  vehiculo.id = _id;
  return vehiculo;
};

const Vehiculo = model<IVehiculo>("Vehiculo", VehiculoSchema);
export default Vehiculo;
