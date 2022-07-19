import { createAction, props } from "@ngrx/store";
import { Usuario } from '../../models/usuario.model';

export enum RazonEnvio {
    AGREGAR = 'AGREGAR',
    ACTUALIZAR = 'ACTUALIZAR',
    ACTIVAR = 'ACTIVAR',
    DESACTIVAR = 'DESACTIVAR'
}

const cargaUsuarios = createAction(
    '[USUARIOS] cargar usuarios'
);
const cargaUsuariosSuccess = createAction(
    '[USUARIOS] cargar usuarios success',
    props<{ lista: Array<Usuario> }>()
);

const resetUsuario = createAction(
    '[USUARIOS] reset usuarios'
);

const agregarUsuario = createAction(
    '[USUARIOS] agregar usuario',
    props<{ usuario: Usuario }>()
);
const actualizarUsuario = createAction(
    '[USUARIOS] actualizar usuario',
    props<{ usuario: Usuario }>()
);
const activarUsuario = createAction(
    '[USUARIOS] activar usuario',
    props<{ usuario: Usuario }>()
);

const desactivarUsuario = createAction(
    '[USUARIOS] desactivar usuario',
    props<{ usuario: Usuario }>()
);

const actualizarContrasenia = createAction(
    '[USUARIOS] actualizar contraseña',
    props<{ pass: string, id: string }>()
);
const actualizarContraseniaSuccess = createAction(
    '[USUARIOS] actualizar contraseña',
);

const enviarUsuario = createAction(
    '[USUARIOS] enviar usuario',
    props<{ usuario: Usuario | any, accion: RazonEnvio }>()
);

export const ActionsUsuario = {
    cargaUsuarios,
    cargaUsuariosSuccess,
    resetUsuario,
    agregarUsuario,
    actualizarUsuario,
    activarUsuario,
    desactivarUsuario,
    enviarUsuario,
    actualizarContrasenia,
    actualizarContraseniaSuccess
}
