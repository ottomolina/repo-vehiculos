import { createFeatureSelector, createSelector } from "@ngrx/store";

import { COLORKEY, ColorState } from "./colores.reducer";


export const getColorState = createFeatureSelector<ColorState>( COLORKEY );

export const getColores = createSelector(
    getColorState,
    (state: ColorState) => state
);
