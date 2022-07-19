import Util from "../util/util";
import { IVehiculo } from '../interface/IVehiculo';
import { Vehiculo } from "../database/schema";


export default class VehiculoController {

    public async crear(body: IVehiculo, usuario: string) {
        try {
            const { marca, linea, modelo, color, estado, novedades } = body;
            const fecha_creado = Util.obtenerFecha();
            const item = new Vehiculo({
                marca, linea, modelo, color, estado, usuario, novedades, fecha_creado
            });
            await item.save();
            return Util.exitoso(item);
        } catch (error) {
            return Util.enviarError(`Ocurrió un error al crear el registro.`);
          }
    }

    public async listar() {
        try {
            const lista = await Vehiculo.find();
            return Util.exitoso(lista);
        } catch (error) {
            return Util.enviarError("Ocurrió un error al obtener el listado.");
        }
    }

    public async actualizar(body: IVehiculo, id: string) {
        try {
            const { marca, linea, modelo, color, novedades } = body;
            const item: any = {};
            if(marca) {
                item.marca = marca;
            }
            if(linea) {
                item.linea = linea;
            }
            if(modelo) {
                item.modelo = modelo;
            }
            if(color) {
                item.color = color;
            }
            if(novedades) {
                item.novedades = novedades;
            }
            const vehiculo = await Vehiculo.findByIdAndUpdate(id, item, {
                returnDocument: "after"
            });
            return Util.exitoso(vehiculo);
        } catch (error) {
            return Util.enviarError("Ocurrió un error al actualizar el registro.");
        }
    }
    
    public async eliminar(id: string) {
        try {
            const vehiculo = await Vehiculo.findByIdAndUpdate(id, {estado: false}, {
                returnDocument: "after"
            });
            return Util.exitoso(vehiculo);
        } catch (error) {
            return Util.enviarError("Ocurrió un error al actualizar el registro.");
        }
    }

}