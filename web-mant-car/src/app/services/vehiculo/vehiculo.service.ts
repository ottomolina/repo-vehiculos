import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private rootUrl = '/vehiculos';
  constructor(
      private http: HttpClient
  ) { }

  public crear(vehiculo: Vehiculo): Observable<ResponseModel<Vehiculo>> {
    return this.http.post<ResponseModel<Vehiculo>>(this.rootUrl, vehiculo);
  }

  public listar(): Observable<ResponseModel<Array<Vehiculo>>> {
    return this.http.get<ResponseModel<Array<Vehiculo>>>(this.rootUrl);
  }

  public actualizar(vehiculo: Vehiculo): Observable<ResponseModel<Vehiculo>> {
    return this.http.put<ResponseModel<Vehiculo>>(`${this.rootUrl}/${vehiculo.id}`, vehiculo);
  }

  public eliminar(vehiculo: Vehiculo): Observable<ResponseModel<Vehiculo>> {
    return this.http.delete<ResponseModel<Vehiculo>>(`${this.rootUrl}/${vehiculo.id}`);
  }

}
