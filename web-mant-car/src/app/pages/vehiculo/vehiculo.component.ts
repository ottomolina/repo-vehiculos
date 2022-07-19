import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { MarcaDispatcher } from 'src/app/store/marcas/marcas.dispatch';
import { PageConfigurationService } from '../../services/page-configuration.service';
import { VehiculoDispatcher } from '../../store/vehiculos/vehiculo.dispatch';
import { ColorDispatcher } from '../../store/colores/colores.dispatch';
import { Color } from '../../models/color.model';
import { VehiculoDialogComponent } from './vehiculo-dialog/vehiculo-dialog.component';
import { Marca } from 'src/app/models/marca.model';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  public lstData: Array<Vehiculo> = [];
  public listaColor: Array<Color> = [];
  public listaMarca: Array<Marca> = [];

  public displayedColumns: string[] = ['id', 'marca', 'linea', 'modelo', 'color', 'fecha_creado', 'options'];

  constructor(
    public app: PageConfigurationService,
    public dispatch: VehiculoDispatcher,
    private storeMarca: MarcaDispatcher,
    private storeColor: ColorDispatcher,
  ) { }

  ngOnInit(): void {
    this.app.showLoading().then(() => {
      this.dispatch.cargarVehiculos().subscribe(result => {
        this.app.dismissLoading();
        this.lstData = result.lista.filter(e => e.estado === true);
      })
    });
    this.storeMarca.cargarMarcas().subscribe(result => {
      this.listaMarca = result.lista;
    });
    this.storeColor.cargarColores().subscribe(result => {
      this.listaColor = result.lista;
    });
  }

  public abrirDialog(obj?: any): void {
    console.log('data', obj);
    const data: any = {
      orm: obj,
      listas: [ this.listaMarca, this.listaColor ]
    };
    const ref = this.app.openDialog(VehiculoDialogComponent, data, null);
    ref.componentInstance.handleGuardar.subscribe((result: any) => {
      this.handleGuardar(result);
    });
  }

  public clickEliminar(item: Vehiculo) {
    this.dispatch.eliminarVehiculo(item);
  }

  private handleGuardar = async (obj: Vehiculo) => {
    const { id } = obj;
    id ? this.dispatch.actualizarVehiculo(obj)
       : this.dispatch.agregarVehiculo(obj);
  }

  public getColor = (id: string) => this.listaColor.find(el => el.id === id)?.color;

}
