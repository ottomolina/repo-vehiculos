import { createReducer, on } from '@ngrx/store';
import { ActionsUsuario } from './usuario.actions';
import { Usuario } from '../../models/usuario.model';

export const USUARIOKEY = 'usuario-key';

export interface UsuarioState {
    lista: Array<Usuario>,
    loadedFromServer: boolean
}

const initialState: UsuarioState = {
    lista: [],
    loadedFromServer: false
};

const actualizarUsuario = (state: Array<Usuario>, usuario: Usuario) => {
    const index = state.findIndex(obj => obj.id === usuario.id);
    const { id, ...obj } = usuario;
    return [
        ...state.slice(0, index),
        {
            ...state[index],
            ...obj
        },
        ...state.slice(index+1)
    ];
}

export const UsuarioReducer = createReducer(
    initialState,
    on(ActionsUsuario.resetUsuario, ( state ) => ({
        ...state,
        lista: [
            ...state.lista.slice(0, 0),
        ],
        loadedFromServer: false
    })),
    on(ActionsUsuario.cargaUsuarios, state => state),
    on(ActionsUsuario.cargaUsuariosSuccess, ( state, { lista }) => ({
        ...state,
        lista: [ ...lista ],
        loadedFromServer: true
    })),
    on(ActionsUsuario.agregarUsuario, ( state, { usuario }) => ({
        ...state,
        lista: [ ...state.lista, { ...usuario } ]
    })),
    on(ActionsUsuario.actualizarUsuario, ( state, { usuario }) => ({
        ...state,
        lista: actualizarUsuario(state.lista, usuario)
    })),
    on(ActionsUsuario.activarUsuario, ( state, { usuario }) => ({
        ...state,
        lista: actualizarUsuario(state.lista, usuario)
    })),
    on(ActionsUsuario.desactivarUsuario, ( state, { usuario }) => ({
        ...state,
        lista: actualizarUsuario(state.lista, usuario)
    })),
    on(ActionsUsuario.enviarUsuario, ( state ) => state),
    on(ActionsUsuario.actualizarContrasenia, ( state ) => state),
    on(ActionsUsuario.actualizarContraseniaSuccess, ( state ) => state)
)
