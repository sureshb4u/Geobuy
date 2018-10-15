import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeService } from './home.service';
import { ApiConfigService } from './api-config.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { GlobalFilterComponent } from './global-filter/global-filter.component';
import { GlobalDetailsComponent } from './global-details/global-details.component';
import { AgmCoreModule } from '@agm/core';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { GooglePlacesDirective } from './directives/google-places.directive'

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    GlobalFilterComponent,
    GlobalDetailsComponent,
    SellerDetailsComponent,
    GooglePlacesDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvwXT0zFwYna9p2CcAyHDmdRyeemlwnes'
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ApiConfigService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
