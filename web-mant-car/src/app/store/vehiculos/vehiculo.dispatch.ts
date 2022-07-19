import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { VehiculoState } from "./vehiculo.reducer";
import { ActionsVehiculo, RazonEnvio } from './vehiculo.actions';
import * as Selector from './vehiculo.selector';
import { Vehiculo } from '../../models/vehiculo.model';

@Injectable({
    providedIn: 'root'
})
export class VehiculoDispatcher {

    constructor(
        private storeVehiculo: Store<VehiculoState>
    ) {}

    public refresh() {
        this.storeVehiculo.dispatch(ActionsVehiculo.resetVehiculo());
    }

    public cargarVehiculos(): Observable<VehiculoState> {
        this.storeVehiculo.select(Selector.getVehiculo).subscribe(res => {
            if(!res.loadedFromServer) {
                this.storeVehiculo.dispatch(ActionsVehiculo.cargaVehiculos());
            }
        });
        return this.storeVehiculo.select(Selector.getVehiculo);
    }

    public agregarVehiculo(vehiculo: Vehiculo) {
        this.storeVehiculo.dispatch(ActionsVehiculo.enviarVehiculo({ vehiculo, accion: RazonEnvio.AGREGAR }));
    }

    public actualizarVehiculo(vehiculo: Vehiculo) {
        this.storeVehiculo.dispatch(ActionsVehiculo.enviarVehiculo({ vehiculo, accion: RazonEnvio.ACTUALIZAR }));
    }
    
    public eliminarVehiculo(vehiculo: Vehiculo) {
        this.storeVehiculo.dispatch(ActionsVehiculo.enviarVehiculo({ vehiculo, accion: RazonEnvio.ELIMINAR }));
    }

}