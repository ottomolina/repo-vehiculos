import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { Marca } from '../../models/marca.model';

@Injectable({
    providedIn: 'root'
  })
  export class MarcaService {
  
    private rootUrl = '/marcas';
    constructor(
        private http: HttpClient
    ) { }
  
    public crear(marca: Marca): Observable<ResponseModel<Marca>> {
      return this.http.post<ResponseModel<Marca>>(this.rootUrl, marca);
    }
  
    public listar(): Observable<ResponseModel<Array<Marca>>> {
      return this.http.get<ResponseModel<Array<Marca>>>(this.rootUrl);
    }
  
  }