import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CustomInputModule } from '../components/custom-input/custom-input.module';
import { LoadingModule } from '../components/loading/loading.module';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CustomInputModule,
    LoadingModule,
    MatInputModule
  ]
})
export class LoginModule { }
