import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { GlobalDetailsComponent } from './global-details/global-details.component';
import {SellerDetailsComponent}  from './seller-details/seller-details.component'


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'details', component: GlobalDetailsComponent },
  { path: 'seller', component: SellerDetailsComponent }
];

@NgModule({
  imports:[ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 

 
  
}
