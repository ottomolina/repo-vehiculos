import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RazonEnvio, ActionsUsuario } from './usuario.actions';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) { }

    public cargarUsuarios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsUsuario.cargaUsuarios),
            exhaustMap(action => {
                return this.usuarioService.listar().pipe(
                    map(result => ActionsUsuario.cargaUsuariosSuccess({
                        lista: result.data
                    })),
                    catchError(err => EMPTY)
                );
            })
        )
    );
   
    public actualizarContrasenia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsUsuario.actualizarContrasenia),
            exhaustMap(action => {
                return this.usuarioService.actualizaContrasenia(action.pass, action.id).pipe(
                    map(result => ActionsUsuario.actualizarContraseniaSuccess()),
                    catchError(err => EMPTY)
                );
            })
        )
    );

    public enviarUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsUsuario.enviarUsuario),
            exhaustMap(action => {
                if(action.accion === RazonEnvio.AGREGAR) {
                    return this.usuarioService.crear(action.usuario).pipe(
                        map(result => ActionsUsuario.agregarUsuario({ usuario: result.data })),
                        catchError(err => EMPTY)
                    )
                } else if(action.accion === RazonEnvio.ACTUALIZAR) {
                    return this.usuarioService.actualizar(action.usuario).pipe(
                        map(result => ActionsUsuario.actualizarUsuario({ usuario: result.data })),
                        catchError(err => EMPTY)
                        )
                } else if(action.accion === RazonEnvio.ACTIVAR) {
                    return this.usuarioService.activar(action.usuario).pipe(
                        map(result => ActionsUsuario.activarUsuario({ usuario: result.data })),
                        catchError(err => EMPTY)
                        )
                } else {
                    return this.usuarioService.desactivar(action.usuario).pipe(
                        map(result => ActionsUsuario.desactivarUsuario({ usuario: result.data })),
                        catchError(err => EMPTY)
                )}
            })
        )
    );

}