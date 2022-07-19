import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioDispatcher } from '../../store/usuarios/usuario.dispatch';
import { PageConfigurationService } from '../../services/page-configuration.service';
import { encodeB64 } from '../../services/util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public formUsuario: FormGroup;
  public formContrasenia: FormGroup;
  private fb: FormBuilder;
  private datos: Usuario;

  constructor(
    public storage: StorageService,
    public dispatch: UsuarioDispatcher,
    public app: PageConfigurationService,
    public router: Router
  ) {
    this.datos = storage.getUser();
    this.fb = new FormBuilder();

    this.formUsuario = this.fb.group({
      nombres: [this.datos ? this.datos.nombres : '', [Validators.required]],
      apellidos: [this.datos ? this.datos.apellidos : '', [Validators.required]],
      correo: [this.datos ? this.datos.correo : '', [Validators.required]],
    });
    this.formContrasenia = this.fb.group({
      clave: ['', [Validators.required]],
      confirmaClave: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
  }

  public clickGuardarDatos(): void {
    const obj = this.formUsuario.value;
    obj.id = this.datos.id;
    this.dispatch.actualizarUsuario(obj);
    this.datos.nombres = obj.nombres;
    this.datos.apellidos = obj.apellidos;
    this.storage.setUser(this.datos);
    this.app.showMessage('Datos cambiados con éxito.')
  }
  
  public clickCambiarClave(): void {
    const obj = this.formContrasenia.value;
    if(obj.clave !== obj.confirmaClave) {
      this.app.showMessage('Tus contraseñas no coinciden.');
      return;
    }
    const offset = encodeB64(obj.clave);
    this.dispatch.actualizarContrasenia(offset, this.datos.id);
    this.formContrasenia.reset();
    this.app.showMessage('Contraseña cambiada con éxito, cerraremos tu sesión en 5 segundos por seguridad.');
    setTimeout(() => {
      this.storage.closeSession();
      this.router.navigate(['/login']);
    }, 5000);
  }

}
