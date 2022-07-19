import { Color } from "../database/schema";
import Util from "../util/util";

export default class ColorController {
  public async agregarColor(body: any) {
    try {
      const { color } = body;
      const item = new Color({ color });
      await item.save();
      return Util.exitoso(item);
    } catch (error) {
      return Util.enviarError(`Ocurrió un error al crear el registro.`);
    }
  }

  public async listarColores() {
    try {
      const lista = await Color.find();
      return Util.exitoso(lista);
    } catch (error) {
      return Util.enviarError("Ocurrió un error al obtener el listado.");
    }
  }
}
