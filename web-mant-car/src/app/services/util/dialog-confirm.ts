import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  template: `
    <h1 mat-dialog-title>{{data.titulo}}</h1>
    <div mat-dialog-content>
      <p>{{data.mensaje}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="confirm()" cdkFocusInitial>Sí</button>
      <button mat-button (click)="closeDialog()">No</button>
    </div>
  `
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
    this.dialog.close(false);
  }
  confirm(): void {
    this.dialog.close(true);
  }

  ngOnInit(): void {
  }

}
