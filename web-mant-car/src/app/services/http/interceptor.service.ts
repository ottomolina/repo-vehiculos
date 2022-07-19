import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageConfigurationService } from '../page-configuration.service';
import { StorageService } from '../storage/storage.service';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {
    
    constructor(
        private storage: StorageService,
        private app: PageConfigurationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storage.getToken();
        const url = request.url;

        if (token !== null) {
            request = request.clone({ setHeaders: { 'Authorization': token } });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ setHeaders: { 'content-type': 'application/json' } });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json'),
            url: `${environment.ws}${url}`
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const { body } = event;
                    if(body.codigo !== 0) {
                        const mensaje = {
                            codigo: body.codigo,
                            mensaje: body.mensaje,
                            sesion: body.sesion
                        }
                        throw new HttpErrorResponse({
                            error: mensaje,
                            headers: event.headers,
                            status: 400,
                            statusText: 'Warning',
                            url: `${event.url}`
                        });
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                if(error.error.mensaje) {
                    this.app.showMessage(error.error.mensaje);
                } else {
                    this.app.showMessage('Ocurrió un evento inesperado al conectar con el servidor.');
                }
                return throwError(error);
            })
        );
    }

}
