import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private rootUrl = '/usuario';
  constructor(
      private http: HttpClient
  ) { }

  public crear(usuario: Usuario): Observable<ResponseModel<Usuario>> {
    return this.http.post<ResponseModel<Usuario>>(this.rootUrl, usuario);
  }

  public listar(): Observable<ResponseModel<Array<Usuario>>> {
    return this.http.get<ResponseModel<Array<Usuario>>>(this.rootUrl);
  }

  public actualizar(usuario: Usuario): Observable<ResponseModel<Usuario>> {
    return this.http.put<ResponseModel<Usuario>>(`${this.rootUrl}/${usuario.id}`, usuario);
  }
  
  public actualizaContrasenia(offset: string, id: string): Observable<ResponseModel<Usuario>> {
    return this.http.put<ResponseModel<Usuario>>(`${this.rootUrl}/actualiza-contrasenia/${id}`, { offset });
  }
  
  public resetContrasenia(usuario: Usuario): Observable<ResponseModel<Usuario>> {
    return this.http.put<ResponseModel<Usuario>>(`${this.rootUrl}/reset-contrasenia/${usuario.id}`, usuario);
  }
  
  public desactivar(usuario: Usuario): Observable<ResponseModel<Usuario>> {
    return this.http.put<ResponseModel<Usuario>>(`${this.rootUrl}/desactivar/${usuario.id}`, {});
  }
  public activar(usuario: Usuario): Observable<ResponseModel<Usuario>> {
    return this.http.put<ResponseModel<Usuario>>(`${this.rootUrl}/activar/${usuario.id}`, {});
  }

}
