import { Request, Response } from "express";
import Usuario from "../database/schema/usuario.schema";

import CorreoStr from "../mail/templates/template-correo";
import { MailUtils } from "../mail/send-mail";

import Util from "../util/util";
import Secure from "../util/secure";

export default class UsuarioController {
  public async crearUsuario(body: any) {
    try {
      const { nombres, apellidos, correo } = body;
      const { offset, password } = Secure.generarContraseniaGenerica();
      const usuario = new Usuario({
        nombres,
        apellidos,
        correo,
        offset,
        fecha: Util.obtenerFecha(),
      });
      await usuario.save();

      /** Funcionalidad para envío de correo al crear el usuario */
      let mensaje = CorreoStr.templateCreacionUsuario;
      mensaje = mensaje.replace('@@username_label', `${nombres} ${apellidos}`);
      mensaje = mensaje.replace('@@password_label', `${password}`);

      const args = {
          correo, asunto: 'Bienvenido', html: mensaje,
          fnOk: (info: any) => {
          },
          fnError: (error: any) => {
              console.log('Ocurrió un error al enviar el correo', error);
          }
      }
      MailUtils.enviar_mail(args);
      usuario.offset = undefined;
      usuario.tokens = undefined;
      return Util.exitoso(usuario);
    } catch (error) {
      return Util.enviarError(`Ocurrió un error al crear el usuario.`);
    }
  }

  public async actualizarUsuario(body: any, id: string) {
    try {
      const { nombres, apellidos } = body;

      const usuario: any = {};
      if (nombres) {
        usuario.nombres = nombres;
      }
      if (apellidos) {
        usuario.apellidos = apellidos;
      }

      const user = await Usuario.findByIdAndUpdate(id, usuario, {
        returnDocument: "after",
      });
      user.tokens = undefined;
      return Util.exitoso(user);
    } catch (error) {
      return Util.enviarError(
        `Ocurrió un error al actualizar los datos de tu usuario.`
      );
    }
  }

  public async actualizarContrasenia(body: any, id: string) {
    try {
      const { offset } = body;

      const usuario: any = {};
      usuario.offset = Secure.encriptarContrasenia(offset);

      await Usuario.findByIdAndUpdate(id, usuario, { returnDocument: "after" });
      // Al momento de cambiar la contraseña cerrar las sesiones activas
      await Usuario.updateOne(
        { _id: id },
        {
          $set: {
            "tokens.$[].fecha_fin": Util.obtenerFecha(),
            "tokens.$[].estado": false,
          },
        }
      );
      return Util.exitoso();
    } catch (error) {
      return Util.enviarError(
        `Ocurrió un error al actualizar la contraseña del usuario.`
      );
    }
  }

  public async listarUsuarios(query: any) {
    try {
      const { limite = 10, desde = 0 } = query;
      const lista = await Usuario.find()
        .select([
          "nombres",
          "apellidos",
          "correo",
          "rol",
          "estado",
          "fecha",
          "_id",
        ])
        .limit(Number(limite))
        .skip(Number(desde));
      return Util.exitoso(lista);
    } catch (error) {
      return Util.enviarError(
        "Ocurrió un error al obtener la lista de usuarios."
      );
    }
  }

  public async desactivarUsuario(id: string) {
    return await this.cambiarEstadoUsuario(false, id);
  }

  public async activarUsuario(id: string) {
    return await this.cambiarEstadoUsuario(true, id);
  }

  private async cambiarEstadoUsuario(estado: boolean, id: string) {
    try {
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado },
        { returnDocument: "after" }
      );
      usuario.tokens = undefined;
      return Util.exitoso(usuario);
    } catch (error) {
      return Util.enviarError(
        `Ocurrió un error al ${
          estado ? "habilitar" : "deshabilitar"
        } el usuario.`
      );
    }
  }
}
