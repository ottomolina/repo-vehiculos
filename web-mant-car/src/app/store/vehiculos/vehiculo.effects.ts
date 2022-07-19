import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { ActionsVehiculo, RazonEnvio } from './vehiculo.actions';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehiculoEffects {
    constructor(
        private actions$: Actions,
        private vehiculoService: VehiculoService
    ) { }

    public cargarVehiculos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsVehiculo.cargaVehiculos),
            exhaustMap(action => {
                return this.vehiculoService.listar().pipe(
                    map(result => ActionsVehiculo.cargaVehiculosSuccess({
                        listaVehiculo: result.data
                    })),
                    catchError(err => EMPTY)
                );
            })
        )
    );

    public enviarVehiculo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsVehiculo.enviarVehiculo),
            exhaustMap(action => {
                if(action.accion === RazonEnvio.AGREGAR) {
                    return this.vehiculoService.crear(action.vehiculo).pipe(
                        map(result => ActionsVehiculo.agregarVehiculo({ vehiculo: result.data })),
                        catchError(err => EMPTY)
                    )
                } else if(action.accion === RazonEnvio.ACTUALIZAR) {
                    return this.vehiculoService.actualizar(action.vehiculo).pipe(
                        map(result => ActionsVehiculo.actualizarVehiculo({ vehiculo: result.data })),
                        catchError(err => EMPTY)
                        )
                } else {
                    return this.vehiculoService.eliminar(action.vehiculo).pipe(
                        map(result => ActionsVehiculo.eliminarVehiculo({ vehiculo: result.data })),
                        catchError(err => EMPTY)
                )}
            })
        )
    );

}