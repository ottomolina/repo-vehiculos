import { createReducer, on } from '@ngrx/store';
import { Vehiculo } from '../../models/vehiculo.model';
import { ActionsVehiculo } from './vehiculo.actions';

export const VEHICULOKEY = 'vehiculo-key';

export interface VehiculoState {
    lista: Array<Vehiculo>,
    loadedFromServer: boolean
}

const initialState: VehiculoState = {
    lista: [],
    loadedFromServer: false
};

const actualizarVehiculo = (state: Array<Vehiculo>, vehiculo: Vehiculo) => {
    const index = state.findIndex(obj => obj.id === vehiculo.id);
    const { id, ...obj } = vehiculo;
    return [
        ...state.slice(0, index),
        {
            ...state[index],
            ...obj
        },
        ...state.slice(index+1)
    ];
}

export const VehiculoReducer = createReducer(
    initialState,
    on(ActionsVehiculo.resetVehiculo, ( state ) => ({
        ...state,
        lista: [
            ...state.lista.slice(0, 0),
        ],
        loadedFromServer: false
    })),
    on(ActionsVehiculo.cargaVehiculos, state => state),
    on(ActionsVehiculo.cargaVehiculosSuccess, ( state, { listaVehiculo }) => ({
        ...state,
        lista: [ ...listaVehiculo ],
        loadedFromServer: true
    })),
    on(ActionsVehiculo.agregarVehiculo, ( state, { vehiculo }) => ({
        ...state,
        lista: [ ...state.lista, { ...vehiculo } ]
    })),
    on(ActionsVehiculo.actualizarVehiculo, ( state, { vehiculo }) => ({
        ...state,
        lista: actualizarVehiculo(state.lista, vehiculo)
    })),
    on(ActionsVehiculo.eliminarVehiculo, ( state, { vehiculo }) => ({
        ...state,
        lista: actualizarVehiculo(state.lista, vehiculo)
    })),
    on(ActionsVehiculo.enviarVehiculo, ( state ) => state)
)
