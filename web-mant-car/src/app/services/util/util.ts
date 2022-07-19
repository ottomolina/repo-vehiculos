

/**
 * Codifica una cadena de texto a base64
 * @param data cadena de caracteres a convertir
 * @returns cadena codificada en base64
 */
export const encodeB64 = (data: string): string => {
    return window.btoa(data);
};
  
/**
 * Decodifica una cadena en base64
 * @param data cadena de caracteres de base64
 * @returns cadena decodificada
 */
export const decodeB64 = (data: string): string => {
    return window.atob(data);
};

export const transformarFecha = (fecha: Date): string => {
    let date = new Date(fecha.toLocaleString("en-US", {timeZone: "America/Guatemala"}));
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let day = `${date.getDate()}`.padStart(2, '0');
    let hour = `${date.getHours()}`.padStart(2, '0');
    let minute = `${date.getMinutes()}`.padStart(2, '0');
    let seconds = `${date.getSeconds()}`.padStart(2, '0');
    let curDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    return curDate;
}