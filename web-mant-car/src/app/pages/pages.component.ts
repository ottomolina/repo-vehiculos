import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  sidenav: MatSidenav;
  username: string;
  opened = true;

  navItems = [
    { text: 'Vehículos', icon: 'directions_car', link: '/vehiculos' },
  ];

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
    const { nombres, apellidos } = this.storage.getUser();
    this.username = `${nombres} ${apellidos}`;
  }

  ngOnInit(): void {
    const usuario: Usuario = this.storage.getUser();
    if(usuario.rol === 'ADMIN') {
      this.navItems.push({ text: 'Usuarios', icon: 'people', link: '/usuarios' })
    }
    this.navItems.push({ text: 'Perfil', icon: 'person', link: '/perfil' })
  }

  public async cerrarSesion() {
    await this.authService.logout();
    this.storage.closeSession();
    this.router.navigate(['/login']);
  }

}
