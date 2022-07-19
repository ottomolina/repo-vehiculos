import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import { ColorService } from '../../services/colores/color.service';
import { ActionsColor } from './colores.actions';

@Injectable({
    providedIn: 'root'
})
export class ColorEffects {
    constructor(
        private actions$: Actions,
        private colorService: ColorService
    ) { }

    public cargarMarcas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsColor.cargaColores),
            exhaustMap(action => {
                return this.colorService.listar().pipe(
                    map(result => ActionsColor.cargaColoresSuccess({
                        listaColor: result.data
                    })),
                    catchError(err => EMPTY)
                );
            })
        )
    );

}