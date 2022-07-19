import { IToken } from "../interface/IUsuario";
import { Usuario } from "../database/schema/";
import bcrypt from "bcrypt";
import Util from "../util/util";
import { codificaTokenSesion, decodificarTokenSesion } from "../util/jwt";

export default class AuthController {
  public async login(body: any): Promise<any> {
    const { correo, offset } = body;
    try {
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return Util.enviarError("Usuario o contraseña incorrectos.");
      }
      const password = `${usuario.offset}`;
      const validOffset = bcrypt.compareSync(offset, password);
      if (!validOffset) {
        return Util.enviarError("Usuario o contraseña incorrectos.");
      }
      if (!usuario.estado) {
        return Util.enviarError("Tu usuario no está activo.");
      }
      const primer_login = usuario.tokens?.length === 0;
      const token = await codificaTokenSesion(usuario.id);

      const objToken: IToken = {
        token,
        fecha_inicio: Util.obtenerFecha(),
        fecha_fin: null,
        estado: true,
      };
      usuario.tokens.push(objToken);
      await usuario.save();
      usuario.tokens = undefined;

      return Util.exitoso({ primer_login, usuario, token });
    } catch (error) {
      return Util.enviarError(
        "Ocurrió un error al autenticarse, reintente en un momento."
      );
    }
  }

  public async logout(token: string): Promise<any> {
    const uid = decodificarTokenSesion(token);
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return Util.mensaje("Sesión finalizada previamente.", false);
    }
    const tokenOrm = usuario.tokens.find((e) => e.token === token);
    if (!tokenOrm) {
      return Util.mensaje("Sesión finalizada previamente.", false);
    }
    await Usuario.updateOne(
      { _id: uid, "tokens._id": tokenOrm.id },
      {
        $set: {
          "tokens.$.fecha_fin": Util.obtenerFecha(),
          "tokens.$.estado": false,
        },
      }
    );
    return Util.exitoso();
  }
}

// const login = async(req: Request, res: Response) => {
//     const { correo, offset } = req.body;
//     try {
//         const usuario = await Usuario.findOne({ correo });
//         if ( !usuario ) {
//             return Util.enviarMensajeError(res, 'Usuario o contraseña incorrectos.');
//         }
//         const password = `${usuario.offset}`;
//         const validOffset = bcrypt.compareSync(offset, password);
//         if ( !validOffset ) {
//             return Util.enviarMensajeError(res, 'Usuario o contraseña incorrectos.');
//         }
//         if ( !usuario.estado ) {
//             return Util.enviarMensajeError(res, 'Tu usuario no está activo.');
//         }
//         const primer_login = usuario.tokens?.length === 0;
//         const token = await codificaTokenSesion( usuario.id );

//         const objToken: IToken = {
//             token,
//             fecha_inicio: Util.obtenerFecha(),
//             fecha_fin: null,
//             estado: true
//         };
//         usuario.tokens.push(objToken);
//         await usuario.save();
//         usuario.tokens = undefined;

//         Util.responseOK(res, { primer_login, usuario, token });
//     } catch (error) {
//         Util.enviarMensajeError(res, 'Ocurrió un error al autenticarse, reintente en un momento.');
//     }
// }

// const logout = async(req: Request, res: Response) => {
//     const token = req.header('Authorization');
//     const { uid } = req.body;
//     const usuario = await Usuario.findById( uid );
//     if ( !usuario ) {
//         return Util.enviarMensaje(res, 'Sesión finalizada previamente.', false);
//     }
//     const tokenOrm = usuario.tokens.find(e => e.token === token);
//     if(!tokenOrm) {
//         return Util.enviarMensajeError(res, 'Sesión finalizada previamente.');
//     }
//     await Usuario.updateOne(
//         { _id: uid, "tokens._id": tokenOrm.id },
//         {
//             $set: {
//                 "tokens.$.fecha_fin": Util.obtenerFecha(),
//                 "tokens.$.estado": false
//             }
//         }
//     );
//     return Util.responseOK(res);
// }

// const Ctrl = {
//     login,
//     logout
// }

// export default Ctrl;
