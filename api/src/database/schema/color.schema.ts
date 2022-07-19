import { Schema, model, SchemaTypes } from "mongoose";
import { IColor } from "../../interface/IColor";

const ColorSchema = new Schema<IColor>({
  color: {
    type: SchemaTypes.String,
    required: [true, "El color es obligatorio."],
  },
});

ColorSchema.methods.toJSON = function () {
  const { __v, _id, ...color } = this.toObject();
  color.id = _id;
  return color;
};

const Color = model<IColor>("Color", ColorSchema);
export default Color;
