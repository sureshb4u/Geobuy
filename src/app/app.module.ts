import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeService } from './home.service';
import { ProductsService } from './products.service';
import { ApiConfigService } from './api-config.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { GlobalFilterComponent } from './global-filter/global-filter.component';
import { GlobalDetailsComponent } from './global-details/global-details.component';
import { AgmCoreModule } from '@agm/core';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { SellerService } from './seller.service';
import { GooglePlacesDirective } from './directives/google-places.directive'
import { CommunicationService} from './communication.service';
import { CartComponent } from './cart/cart.component'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    GlobalFilterComponent,
    GlobalDetailsComponent,
    SellerDetailsComponent,
    GooglePlacesDirective,
    CartComponent,
    LoginComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvwXT0zFwYna9p2CcAyHDmdRyeemlwnes'
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ApiConfigService, HomeService, ProductsService, SellerService, CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
