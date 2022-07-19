
export class ErrorHttp {
    codigo: number;
    mensaje: string;
    sesion = false;

    constructor(codigo: number, mensaje: string, sesion?: boolean) {
        this.codigo = codigo;
        this.mensaje = mensaje;
        this.sesion = sesion;
    }
}
