import { Marca } from "../database/schema";
import Util from "../util/util";

export default class MarcaController {
  public async agregarMarca(body: any) {
    try {
      const { marca, lineas } = body;
      const item = new Marca({ marca, lineas });
      await item.save();
      return Util.exitoso(item);
    } catch (error) {
      return Util.enviarError(`Ocurrió un error al crear el registro.`);
    }
  }

  public async listarMarcas() {
    try {
      const lista = await Marca.find();
      return Util.exitoso(lista);
    } catch (error) {
      return Util.enviarError("Ocurrió un error al obtener el listado.");
    }
  }
}
