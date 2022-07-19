import bcrypt from "bcrypt";
import Util from "../util/util";

const generarContraseniaGenerica = () => {
  const password = Util.generatePassword();
  const passwordBase64 = Util.btoa(password);
  const offset = bcrypt.hashSync(passwordBase64, bcrypt.genSaltSync());
  return {offset, password};
};

/**
 * Encripta una contraseña, esta deberá estar codificada en base64
 * @param password contraseña a encriptar en base64
 * @returns contraseña encriptada
 */
const encriptarContrasenia = (passwordBase64: string) => {
  const offset = bcrypt.hashSync(passwordBase64, bcrypt.genSaltSync());
  return offset;
};

const Secure = {
  generarContraseniaGenerica,
  encriptarContrasenia,
};
export default Secure;
