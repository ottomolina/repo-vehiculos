import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';
import { Login } from '../../models/login.model';
import { encodeB64 } from '../util/util';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient
    ) { }

    public login(correo: string, offset: string): Observable<ResponseModel<Login>> {
        const data = { correo, offset: encodeB64(offset) };
        return this.http.post<ResponseModel<Login>>(`/auth/login`, data);
    }

    public logout(): Observable<ResponseModel<any>> {
        return this.http.post<ResponseModel<any>>(`/auth/logout`, {});
    }
}
