import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as Selector from './colores.selector';
import { ColorState } from './colores.reducer';
import { ActionsColor } from './colores.actions';

@Injectable({
    providedIn: 'root'
})
export class ColorDispatcher {

    constructor(
        private storeColor: Store<ColorState>
    ) {}

    public refresh() {
        this.storeColor.dispatch(ActionsColor.resetColor());
    }

    public cargarColores(): Observable<ColorState> {
        this.storeColor.select(Selector.getColores).subscribe(res => {
            if(!res.loadedFromServer) {
                this.storeColor.dispatch(ActionsColor.cargaColores());
            }
        });
        return this.storeColor.select(Selector.getColorState);
    }

}