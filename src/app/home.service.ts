import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import {ApiConfigService} from './api-config.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private apiConfig: ApiConfigService, private http : HttpClient) { }

  getMasterCategory(): Observable<any> {
    
      var url = this.apiConfig.hostUrl+"categorymaster";
      console.log('url ::'+url );
      return this.http.get<any>(url).pipe(
        tap((res) => console.log(res))
      );
    }

    getCategories(): Observable<any> {
      
        var url = this.apiConfig.hostUrl+"categories";
        console.log('url ::'+url );
        return this.http.get<any>(url).pipe(
          tap(res => console.log(res))
        );
      }

      getSellerCategories(sellerid): Observable<any> {
        var url = this.apiConfig.hostUrl+"seller/"+sellerid+'/categories';
        console.log('url ::'+url );
        return this.http.get<any>(url).pipe(
          tap(res => console.log(res))
        );
      }

    getTrendings(): Observable<any> {
      var url = this.apiConfig.hostUrl+"trendings";
      console.log('url ::'+url );
      return this.http.get<any>(url).pipe(
        tap(res => console.log(res))
      );
    }
}
