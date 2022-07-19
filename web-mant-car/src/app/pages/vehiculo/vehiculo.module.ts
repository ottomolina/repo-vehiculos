import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VehiculoComponent } from './vehiculo.component';
import { TitleBarModule } from '../../components/title-bar/title-bar.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomInputModule } from '../../components/custom-input/custom-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomSelectModule } from '../../components/custom-select/custom-select.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { VehiculoDialogComponent } from './vehiculo-dialog/vehiculo-dialog.component';


@NgModule({
  declarations: [
    VehiculoComponent,
    VehiculoDialogComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
    TitleBarModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CustomInputModule,
    ReactiveFormsModule,
    CustomSelectModule,
    MatTooltipModule
  ]
})
export class VehiculoModule { }
