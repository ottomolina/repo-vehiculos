import { createFeatureSelector, createSelector } from "@ngrx/store";

import { USUARIOKEY, UsuarioState } from "./usuario.reducer";


export const getUsuarioState = createFeatureSelector<UsuarioState>( USUARIOKEY );

export const getUsuario = createSelector(
    getUsuarioState,
    (state: UsuarioState) => state
);
