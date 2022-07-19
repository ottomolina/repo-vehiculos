import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageService } from './services/storage/storage.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule ), canActivate: [ StorageService ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
