import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemSelect } from '../../../models/item-select';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marca } from '../../../models/marca.model';
import { Color } from '../../../models/color.model';

@Component({
  selector: 'app-vehiculo-dialog',
  templateUrl: './vehiculo-dialog.component.html',
  styleUrls: ['./vehiculo-dialog.component.css']
})
export class VehiculoDialogComponent implements OnInit {
  handleGuardar = new EventEmitter();
  public title: string;
  public formVehiculo: FormGroup;
  private fb: FormBuilder;

  public lstMarca: Array<ItemSelect>;
  public lstLinea: Array<ItemSelect>;
  public lstColor: Array<ItemSelect>;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<VehiculoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) {
    this.fb = new FormBuilder();
    this.lstMarca = datos.listas[0].map((element: Marca) => new ItemSelect(element.marca, element.marca));
    this.lstColor = datos.listas[1].map((element: Color) => new ItemSelect(element.color, element.id));
    if (datos.orm) {
      this.selectMarca(datos.orm.marca);
    }

    this.title = datos.orm ? 'Modificar vehículo' : 'Agregar vehículo';
    this.formVehiculo = this.fb.group({
      marca: [datos.orm ? datos.orm.marca : '', [Validators.required]],
      linea: [datos.orm ? datos.orm.linea : '', [Validators.required]],
      modelo: [datos.orm ? datos.orm.modelo : '', [Validators.required]],
      color: [datos.orm ? datos.orm.color : '', [Validators.required]],
      novedades: [datos.orm ? datos.orm.novedades : '', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  public selectMarca(nombre: string): void {
    const marca: Marca = this.datos.listas[0].filter((element: Marca) => element.marca === nombre)[0];
    this.lstLinea = marca.lineas.map((item: string) => new ItemSelect(item, item));
  }

  closeDialog(result?: any): void {
    this.dialogRef.close(result);
  }

  public clickGuardar(): void {
    const obj = this.formVehiculo.value;
    if (this.datos.orm) {
      obj.id = this.datos.orm.id;
    }
    this.handleGuardar.emit(obj);
    this.dialogRef.close();
  }

}
