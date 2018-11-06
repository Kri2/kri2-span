import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from '../car-list/car-list.component';

const routes:Routes = [
  {path: '', redirectTo: 'cars', pathMatch: 'full'},
  {path: 'cars',component:CarListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
