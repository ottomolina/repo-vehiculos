import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogConfirmComponent } from './util/dialog-confirm';
import { transformarFecha } from './util/util';

@Injectable({
  providedIn: 'root'
})
export class PageConfigurationService {
  public isLoading = false;

  constructor(/*public alertService: NgxMatAlertConfirmService,*/
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private spinner: NgxSpinnerService,
  ) {
  }

  showMessage(message: string, action?: any): void {
    this.snackbar.open(message, action, { duration: 5000 });
  }

  public formatoFecha = (fecha: Date) => transformarFecha(fecha);

  public async showLoading() {
    return await this.spinner.show();
  }

  public async dismissLoading() {
    return await this.spinner.hide();
  }

  public getDialogConfig(data?: any, width?: string, height?: string): MatDialogConfig {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = data;
    dialogConf.disableClose = true;
    dialogConf.height = height;
    dialogConf.width = width;
    return dialogConf;
  }

  public openDialog(component: ComponentType<any>, data: any, callback: any): MatDialogRef<any> {
    const wdw = this.dialog.open(
      component,
      this.getDialogConfig( data )
    );

    wdw.afterClosed().subscribe((obj:any) => {
      if (obj !== undefined && obj !== null) {
        if (callback) {
          callback();
        }
      }
    });
    return wdw;
  }

  mostrarDialogo(mensaje: string, titulo: string, callbackYes: any, callbackNo: any): void {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        mensaje,
        titulo: titulo ? titulo : `Confirmación`
      }
    })
    .afterClosed()
    .subscribe((confirmado: boolean) => {
      if (confirmado) {
        if (callbackYes) { callbackYes(); }
      } else {
        if (callbackNo) { callbackNo(); }
      }
    });
  }
}
