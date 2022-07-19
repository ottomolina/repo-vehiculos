import { ActionReducerMap } from "@ngrx/store";
import { MarcaReducer, MarcaState } from "./marcas/marcas.reducer";
import { VehiculoReducer, VehiculoState } from './vehiculos/vehiculo.reducer';
import { ColorState, ColorReducer } from './colores/colores.reducer';
import { UsuarioState, UsuarioReducer } from './usuarios/usuario.reducer';


interface AppState {
    dataVehiculos: VehiculoState,
    dataMarcas: MarcaState,
    dataColores: ColorState,
    dataUsuarios: UsuarioState
}

const reducers: ActionReducerMap<AppState> = {
    dataVehiculos: VehiculoReducer,
    dataMarcas: MarcaReducer,
    dataColores: ColorReducer,
    dataUsuarios: UsuarioReducer
}

export {
    reducers
}