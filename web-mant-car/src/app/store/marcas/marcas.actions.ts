import { createAction, props } from '@ngrx/store';
import { Marca } from '../../models/marca.model';

const cargaMarcas = createAction(
    '[MARCAS] cargar marcas'
);
const cargaMarcasSuccess = createAction(
    '[MARCAS] cargar marcas success',
    props<{ listaMarca: Array<Marca> }>()
);

const resetMarca = createAction(
    '[MARCAS] reset marcas'
);

export const ActionsMarca = {
    cargaMarcas,
    cargaMarcasSuccess,
    resetMarca
}
