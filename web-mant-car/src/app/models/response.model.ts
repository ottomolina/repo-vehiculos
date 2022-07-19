
export class ResponseModel<T> {
    codigo: number;
    mensaje: string;
    sesion: boolean;
    data: T;
}