import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageConfigurationService } from '../services/page-configuration.service';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide = true;
  public txtCorreo = '';
  public txtPass = '';

  public formUsuario: FormGroup;
  private fb: FormBuilder;

  constructor(
    private app: PageConfigurationService,
    private router: Router,
    private authService: AuthService,
    private storage: StorageService,
  ) {
    this.fb = new FormBuilder();
    this.formUsuario = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)] ],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)] ]
    });
  }

  acceder(): void {
    if(this.txtCorreo.trim() === '') {
      this.app.showMessage('Por favor ingresa tu correo.');
      return;
    }
    if(this.txtPass.trim() === '') {
      this.app.showMessage('Por favor ingresa tu contraseña.');
      return;
    }
    this.app.showLoading();
    this.authService.login(this.txtCorreo, this.txtPass).subscribe(resp => {
      const { usuario, token } = resp.data;
      this.storage.setSession(usuario, token);
      setTimeout(() => {
        this.app.dismissLoading();
        this.router.navigate(['/']).then(() => { });
      }, 500);
    }, err => {
      this.app.dismissLoading();
    });
  }

}
