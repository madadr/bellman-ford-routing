import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetworkControllerComponent } from './components/network-controller/network-controller.component';
import { RoutingTableComponent } from './components/routing-table/routing-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NetworkControllerComponent,
    RoutingTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
