import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CarCreateFormComponent } from './car-create-form/car-create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarCreateFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
