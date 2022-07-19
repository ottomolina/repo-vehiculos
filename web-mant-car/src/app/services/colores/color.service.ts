import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { Color } from '../../models/color.model';

@Injectable({
    providedIn: 'root'
  })
  export class ColorService {
  
    private rootUrl = '/color';
    constructor(
        private http: HttpClient
    ) { }
  
    public crear(color: Color): Observable<ResponseModel<Color>> {
      return this.http.post<ResponseModel<Color>>(this.rootUrl, color);
    }
  
    public listar(): Observable<ResponseModel<Array<Color>>> {
      return this.http.get<ResponseModel<Array<Color>>>(this.rootUrl);
    }
  
  }