import { createFeatureSelector, createSelector } from "@ngrx/store";

import { VEHICULOKEY, VehiculoState } from "./vehiculo.reducer";


export const getVehiculoState = createFeatureSelector<VehiculoState>(
    VEHICULOKEY
);

export const getVehiculo = createSelector(
    getVehiculoState,
    (state: VehiculoState) => state
);
