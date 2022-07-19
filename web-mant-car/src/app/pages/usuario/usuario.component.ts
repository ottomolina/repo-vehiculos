import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { PageConfigurationService } from '../../services/page-configuration.service';
import { UsuarioDispatcher } from '../../store/usuarios/usuario.dispatch';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public lstData: Array<Usuario> = [];

  public displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'correo', 'estado', 'fecha_creado', 'options'];

  constructor(
    public app: PageConfigurationService,
    public dispatch: UsuarioDispatcher
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  public cargarUsuarios() {
    this.app.showLoading().then(() => {
      this.dispatch.cargarUsuarios().subscribe(result => {
        this.app.dismissLoading();
        this.lstData = result.lista;
      })
    });
  }

  public abrirDialog(data?: any): void {
    const ref = this.app.openDialog(UsuarioDialogComponent, data, null);
    ref.componentInstance.handleGuardar.subscribe((result: any) => {
      this.handleGuardar(result);
    });
  }

  public clickCambioEstado(usuario: Usuario) {
    if(usuario.estado) {
      this.dispatch.desactivarUsuario(usuario);
    } else {
      this.dispatch.activarUsuario(usuario);
    }
  }

  private handleGuardar = async (usuario: Usuario) => {
    const { id } = usuario;
    id ? this.dispatch.actualizarUsuario(usuario)
       : this.dispatch.agregarUsuario(usuario);
  }

}
