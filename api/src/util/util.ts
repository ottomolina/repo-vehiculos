import { Response } from "express";

const OK = { codigo: 0 };
const ERROR = { codigo: 1 };
const OK_CHANGE_PASS = { codigo: 2 };

const exitoso = (data: any = undefined) => {
  return data
    ? { ...OK, sesion: true, mensaje: "CONSULTA EXITOSA.", data }
    : { ...OK, sesion: true, mensaje: "CONSULTA EXITOSA." };
};
const enviarError = (mensaje: string, sesion: boolean = true) => {
  return { ...ERROR, sesion, mensaje };
};
const mensaje = (mensaje: string, sesion: boolean = true) => {
  return { ...OK, sesion, mensaje };
};

const responseOK = (res: Response, data: any = undefined) => {
  data
    ? res
        .status(200)
        .json({ ...OK, sesion: true, mensaje: "CONSULTA EXITOSA.", data })
    : res
        .status(200)
        .json({ ...OK, sesion: true, mensaje: "CONSULTA EXITOSA." });
};

const enviarMensaje = (
  res: Response,
  mensaje: string,
  sesion: boolean = true
) => {
  res.status(200).json({ ...OK, sesion, mensaje });
};

const enviarMensajeError = (
  res: Response,
  mensaje: string,
  sesion: boolean = true
) => {
  res.status(200).json({ ...ERROR, sesion, mensaje });
};

const enviarMensajeCambioPassword = (res: Response, mensaje: string) => {
  res.status(200).json({ ...OK_CHANGE_PASS, mensaje });
};

const transformarFecha = (fecha: Date): string => {
    let date = new Date(fecha.toLocaleString("en-US", {timeZone: "America/Guatemala"}));
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let day = `${date.getDate()}`.padStart(2, '0');
    let hour = `${date.getHours()}`.padStart(2, '0');
    let minute = `${date.getMinutes()}`.padStart(2, '0');
    let seconds = `${date.getSeconds()}`.padStart(2, '0');
    let curDate = `${year}-${month}-${day}T${hour}:${minute}:${seconds}.000-06:00`;
    return curDate;
}

const obtenerFecha = (): Date => {
  return new Date();
};

// const obtenerFechaActual = () => {
//     const date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"}));
//     let year = date.getFullYear();
//     let month = `${date.getMonth() + 1}`.padStart(2, '0');
//     let day = `${date.getDate()}`.padStart(2, '0');
//     let hour = `${date.getHours()}`.padStart(2, '0');
//     let minute = `${date.getMinutes()}`.padStart(2, '0');
//     let seconds = `${date.getSeconds()}`.padStart(2, '0');

//     let curDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${seconds}.000+00:00`);
//     return curDate;
// }

// const fechaActual = () => {
//     const date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"}));
//     let year = date.getFullYear();
//     let month = `${date.getMonth() + 1}`.padStart(2, '0');
//     let day = `${date.getDate()}`.padStart(2, '0');
//     let curDate = new Date(`${year}-${month}-${day}`);
//     return curDate;
// }

const generatePassword = (length: number = 8) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.*+";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// const validaCampoNoVacio = (campo: string): boolean => {
//     if(campo && campo !== '') {
//         return true;
//     }
//     return false;
// }

// const validaCampoNoVacioBoolean = (campo: boolean): boolean => {
//     if(campo && campo === true) {
//         return true;
//     }
//     return false;
// }

/**
 * Codifica una cadena de texto a base64
 * @param data cadena de caracteres a convertir
 * @returns cadena codificada en base64
 */
const btoa = (data: string): string => {
  return Buffer.from(data).toString("base64");
};

/**
 * Decodifica una cadena en base64
 * @param data cadena de caracteres de base64
 * @returns cadena decodificada
 */
const atob = (data: string): string => {
  return Buffer.from(data, "base64").toString("ascii");
};

const setCampo = (objeto: any, campo: string, valor: any) => {
  if (valor) {
    objeto[campo] = valor;
  }
};

const comparaCampoActualizar = (
  objeto: any,
  campo: string,
  newValor: any,
  antValor: any
) => {
  if (newValor && newValor !== "" && newValor !== antValor) {
    objeto[campo] = newValor;
  }
};

const Util = {
  atob,
  btoa,
  comparaCampoActualizar,
  enviarMensaje,
  enviarMensajeCambioPassword,
  enviarMensajeError,
  generatePassword,
  obtenerFecha,
  responseOK,
  setCampo,
  exitoso,
  enviarError,
  mensaje,
  transformarFecha
};
export default Util;
