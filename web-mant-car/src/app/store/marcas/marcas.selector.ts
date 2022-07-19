import { createFeatureSelector, createSelector } from "@ngrx/store";

import { MARCAKEY, MarcaState } from "./marcas.reducer";


export const getMarcaState = createFeatureSelector<MarcaState>(
    MARCAKEY
);

export const getMarcas = createSelector(
    getMarcaState,
    (state: MarcaState) => state
);
