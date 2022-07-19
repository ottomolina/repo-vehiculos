import { Schema, model, SchemaTypes } from "mongoose";
import { IMarca } from "../../interface/IMarca";

const MarcaSchema = new Schema<IMarca>({
  marca: {
    type: SchemaTypes.String,
    required: [true, "La marca es obligatoria."],
  },
  lineas: {
    type: [SchemaTypes.String],
    required: [true, "La lista de líneas es obligatoria."],
  },
});

MarcaSchema.methods.toJSON = function () {
  const { __v, _id, ...marca } = this.toObject();
  marca.id = _id;
  return marca;
};

const Marca = model<IMarca>("Marca", MarcaSchema);
export default Marca;
