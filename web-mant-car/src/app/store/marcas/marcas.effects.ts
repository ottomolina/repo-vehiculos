import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MarcaService } from '../../services/marcas/marca.service';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import { ActionsMarca } from './marcas.actions';

@Injectable({
    providedIn: 'root'
})
export class MarcaEffects {
    constructor(
        private actions$: Actions,
        private marcaService: MarcaService
    ) { }

    public cargarMarcas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsMarca.cargaMarcas),
            exhaustMap(action => {
                return this.marcaService.listar().pipe(
                    map(result => ActionsMarca.cargaMarcasSuccess({
                        listaMarca: result.data
                    })),
                    catchError(err => EMPTY)
                );
            })
        )
    );

}