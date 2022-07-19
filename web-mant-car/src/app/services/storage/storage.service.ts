import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService implements CanActivate {
    private KEY_USUARIO = 'R00001';
    private KEY_TOKEN = 'R00002';

    constructor(private router: Router) {
    }

    canActivate(): boolean {
        const logged = localStorage.getItem(this.KEY_TOKEN);
        if (logged === null || logged === undefined || logged === '') {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    setSession(usuario: any, token: string): void {
        localStorage.setItem(this.KEY_USUARIO, JSON.stringify(usuario));
        localStorage.setItem(this.KEY_TOKEN, token);
    }

    closeSession(): void {
        localStorage.removeItem(this.KEY_USUARIO);
        localStorage.removeItem(this.KEY_TOKEN);
    }

    getUser() {
        const user = localStorage.getItem(this.KEY_USUARIO);
        return user ? JSON.parse( user ) : null;
    };
    setUser(usuario: Usuario) {
        localStorage.setItem(this.KEY_USUARIO, JSON.stringify(usuario));
    };

    getToken(): string {
        const token = localStorage.getItem(this.KEY_TOKEN);
        return token ? token : '';
    }

}
