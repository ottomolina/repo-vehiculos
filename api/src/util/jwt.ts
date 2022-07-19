import Jwt from "jsonwebtoken";

const secretKey = `${process.env.SECRETKEY}`;

/**
 * Codificar el identificador de usuario en un jwt
 * @param id identificador del usuario para generar el token
 * @returns
 */
export const codificaTokenSesion = (id: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const payload = { id };
    const token = Jwt.sign(payload, secretKey);
    resolve(token);
  });
};

/**
 * Decodificar el token jwt de la sesión y devuelve el id del usuario
 * @param tokenSesion token a decodificar
 * @returns
 */
export const decodificarTokenSesion = (tokenSesion: string): string => {
  let result: { id: string };
  try {
    const res: any = Jwt.verify(tokenSesion, secretKey);
    result = res;
  } catch (error) {
    throw new Error("invalid token");
  }
  return result.id;
};
