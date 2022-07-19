import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UsuarioState } from "./usuario.reducer";
import { ActionsUsuario, RazonEnvio } from './usuario.actions';
import * as Selector from './usuario.selector';
import { Usuario } from '../../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioDispatcher {

    constructor(
        private storeUsuario: Store<UsuarioState>
    ) {}

    public refresh() {
        this.storeUsuario.dispatch(ActionsUsuario.resetUsuario());
    }

    public cargarUsuarios(): Observable<UsuarioState> {
        this.storeUsuario.select(Selector.getUsuario).subscribe(res => {
            if(!res.loadedFromServer) {
                this.storeUsuario.dispatch(ActionsUsuario.cargaUsuarios());
            }
        });
        return this.storeUsuario.select(Selector.getUsuario);
    }

    public agregarUsuario(usuario: Usuario) {
        this.storeUsuario.dispatch(ActionsUsuario.enviarUsuario({ usuario, accion: RazonEnvio.AGREGAR }));
    }

    public actualizarUsuario(usuario: Usuario) {
        this.storeUsuario.dispatch(ActionsUsuario.enviarUsuario({ usuario, accion: RazonEnvio.ACTUALIZAR }));
    }
    
    public desactivarUsuario(usuario: Usuario) {
        this.storeUsuario.dispatch(ActionsUsuario.enviarUsuario({ usuario, accion: RazonEnvio.DESACTIVAR }));
    }
    
    public activarUsuario(usuario: Usuario) {
        this.storeUsuario.dispatch(ActionsUsuario.enviarUsuario({ usuario, accion: RazonEnvio.ACTIVAR }));
    }

    public actualizarContrasenia(pass: string, id: string) {
        this.storeUsuario.dispatch(ActionsUsuario.actualizarContrasenia({ pass, id }));
    }

}