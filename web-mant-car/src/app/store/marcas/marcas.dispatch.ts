import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as Selector from './marcas.selector';
import { MarcaState } from './marcas.reducer';
import { ActionsMarca } from './marcas.actions';

@Injectable({
    providedIn: 'root'
})
export class MarcaDispatcher {

    constructor(
        private storeMarca: Store<MarcaState>
    ) {}

    public refresh() {
        this.storeMarca.dispatch(ActionsMarca.resetMarca());
    }

    public cargarMarcas(): Observable<MarcaState> {
        this.storeMarca.select(Selector.getMarcas).subscribe(res => {
            if(!res.loadedFromServer) {
                this.storeMarca.dispatch(ActionsMarca.cargaMarcas());
            }
        });
        return this.storeMarca.select(Selector.getMarcas);
    }

}