import { on, createReducer } from '@ngrx/store';
import { Marca } from '../../models/marca.model';
import { ActionsMarca } from './marcas.actions';

export const MARCAKEY = 'marca-key';

export interface MarcaState {
    lista: Array<Marca>,
    loadedFromServer: boolean
}

const initialState: MarcaState = {
    lista: [],
    loadedFromServer: false
};

export const MarcaReducer = createReducer(
    initialState,
    on(ActionsMarca.resetMarca, ( state ) => ({
        ...state,
        lista: [
            ...state.lista.slice(0, 0),
        ],
        loadedFromServer: false
    })),
    on(ActionsMarca.cargaMarcas, state => state),
    on(ActionsMarca.cargaMarcasSuccess, ( state, { listaMarca }) => ({
        ...state,
        lista: [ ...listaMarca ],
        loadedFromServer: true
    }))
)