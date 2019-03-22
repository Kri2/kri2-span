import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from '../car-list/car-list.component';
import { CarCreateFormComponent } from '../car-create-form/car-create-form.component';

const routes:Routes = [
  { path: '', component:CarListComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'form', component: CarCreateFormComponent },
  //{ path: '', redirectTo: '/cars', pathMatch: 'full' }, //<---- this had some problems when reloading on heroku, paths were not available directly
  //{ path: '**', redirectTo: '/cars' } //<--- for 404 page
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing:true } // <-- debugging purposes only
    ) 
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
