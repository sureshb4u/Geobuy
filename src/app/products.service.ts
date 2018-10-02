import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import {ApiConfigService} from './api-config.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiConfig: ApiConfigService, private http : HttpClient) { }

  getProducts(params): Observable<any> {
    var url = this.apiConfig.hostUrl+"getProductsByCategory?category="+params.category;
      console.log('url ::'+url );
      return this.http.get<any>(url).pipe(
        tap((res) => console.log(res))
      );
  }
}
