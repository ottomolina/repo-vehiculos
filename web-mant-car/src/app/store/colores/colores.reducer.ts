import { on, createReducer } from '@ngrx/store';
import { ActionsColor } from './colores.actions';
import { Color } from '../../models/color.model';

export const COLORKEY = 'color-key';

export interface ColorState {
    lista: Array<Color>,
    loadedFromServer: boolean
}

const initialState: ColorState = {
    lista: [],
    loadedFromServer: false
};

export const ColorReducer = createReducer(
    initialState,
    on(ActionsColor.resetColor, ( state ) => ({
        ...state,
        lista: [
            ...state.lista.slice(0, 0),
        ],
        loadedFromServer: false
    })),
    on(ActionsColor.cargaColores, state => state),
    on(ActionsColor.cargaColoresSuccess, ( state, { listaColor }) => ({
        ...state,
        lista: [ ...listaColor ],
        loadedFromServer: true
    }))
)