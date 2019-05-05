import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NetworkControllerComponent} from './components/network-controller/network-controller.component';
import {RoutingTableComponent} from './components/routing-table/routing-table.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateHistoryBrowserComponent } from './components/update-history-browser/update-history-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    NetworkControllerComponent,
    RoutingTableComponent,
    UpdateHistoryBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
