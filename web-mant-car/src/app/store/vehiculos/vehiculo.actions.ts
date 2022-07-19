import { createAction, props } from "@ngrx/store";
import { Vehiculo } from '../../models/vehiculo.model';

export enum RazonEnvio {
    AGREGAR = 'AGREGAR',
    ACTUALIZAR = 'ACTUALIZAR',
    ELIMINAR = 'ELIMINAR'
}

const cargaVehiculos = createAction(
    '[VEHICULOS] cargar vehiculos'
);
const cargaVehiculosSuccess = createAction(
    '[VEHICULOS] cargar vehiculos success',
    props<{ listaVehiculo: Array<Vehiculo> }>()
);

const resetVehiculo = createAction(
    '[VEHICULOS] reset vehiculos'
);

const agregarVehiculo = createAction(
    '[VEHICULOS] agregar vehiculo',
    props<{ vehiculo: Vehiculo }>()
);
const actualizarVehiculo = createAction(
    '[VEHICULOS] actualizar vehiculo',
    props<{ vehiculo: Vehiculo }>()
);
const eliminarVehiculo = createAction(
    '[VEHICULOS] eliminar vehiculo',
    props<{ vehiculo: Vehiculo }>()
);

const enviarVehiculo = createAction(
    '[VEHICULOS] enviar vehiculo',
    props<{ vehiculo: Vehiculo | any, accion: RazonEnvio }>()
);

export const ActionsVehiculo = {
    cargaVehiculos,
    cargaVehiculosSuccess,
    resetVehiculo,
    agregarVehiculo,
    actualizarVehiculo,
    eliminarVehiculo,
    enviarVehiculo,
}
