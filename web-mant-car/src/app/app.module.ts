import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageConfigurationService } from './services/page-configuration.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './services/util/dialog-confirm';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/http/interceptor.service';
import { StoreModule } from '@ngrx/store';
import * as fromVehiculoReducer from './store/vehiculos/vehiculo.reducer';
import * as fromMarcaReducer from './store/marcas/marcas.reducer';
import * as fromColorReducer from './store/colores/colores.reducer';
import * as fromUsuarioReducer from './store/usuarios/usuario.reducer';
import { VehiculoEffects } from './store/vehiculos/vehiculo.effects';
import { EffectsModule } from '@ngrx/effects';
import { MarcaEffects } from './store/marcas/marcas.effects';
import { ColorEffects } from './store/colores/colores.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { UsuarioEffects } from './store/usuarios/usuario.effects';

@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    NgxSpinnerModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromVehiculoReducer.VEHICULOKEY, fromVehiculoReducer.VehiculoReducer),
    StoreModule.forFeature(fromMarcaReducer.MARCAKEY, fromMarcaReducer.MarcaReducer),
    StoreModule.forFeature(fromColorReducer.COLORKEY, fromColorReducer.ColorReducer),
    StoreModule.forFeature(fromUsuarioReducer.USUARIOKEY, fromUsuarioReducer.UsuarioReducer),
    EffectsModule.forRoot([ VehiculoEffects, MarcaEffects, ColorEffects, UsuarioEffects ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    PageConfigurationService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
