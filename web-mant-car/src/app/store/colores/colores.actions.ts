import { createAction, props } from '@ngrx/store';
import { Color } from '../../models/color.model';

const cargaColores = createAction(
    '[COLORES] cargar colores'
);
const cargaColoresSuccess = createAction(
    '[COLORES] cargar colores success',
    props<{ listaColor: Array<Color> }>()
);

const resetColor = createAction(
    '[COLORES] reset colores'
);

export const ActionsColor = {
    cargaColores,
    cargaColoresSuccess,
    resetColor
}
