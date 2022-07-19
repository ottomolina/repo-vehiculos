import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.css']
})
export class UsuarioDialogComponent implements OnInit {
  handleGuardar = new EventEmitter();
  public title: string;
  public formUsuario: FormGroup;
  private fb: FormBuilder;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<UsuarioDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: Usuario) {
    this.fb = new FormBuilder();

    this.title = datos ? 'Modificar usuario' : 'Agregar usuario';
    this.formUsuario = this.fb.group({
      nombres: [datos ? datos.nombres : '', [Validators.required]],
      apellidos: [datos ? datos.apellidos : '', [Validators.required]],
      correo: [datos ? datos.correo : '', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    const obj = this.formUsuario.value;
    if (this.datos) {
      obj.id = this.datos.id;
    }
    this.handleGuardar.emit(obj);
    this.dialogRef.close();
  }


}
