import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from '../car-list/car-list.component';
import { CarCreateFormComponent } from '../car-create-form/car-create-form.component';

const routes:Routes = [
  {path: '', redirectTo: 'cars', pathMatch: 'full'},
  {path: 'cars',component:CarListComponent},
  {path: 'form',component:CarCreateFormComponent}
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
