import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import {ApiConfigService} from './api-config.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiConfig: ApiConfigService, private http : HttpClient) { }


  getCartItems(): Observable<any> {
      
    var url = this.apiConfig.hostUrl+"getProductsFromCart";
    console.log('url ::'+url );
    return this.http.post(url, {useremail: 'viki19nesh@gmail.com'}, {}).pipe( tap(res => console.log(res)));
   /* return this.http.p<any>(url).pipe(
      tap(res => console.log(res))
    ); */
  }

}
