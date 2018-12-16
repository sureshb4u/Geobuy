import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import {ApiConfigService} from './api-config.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private apiConfig: ApiConfigService, private http : HttpClient) { }

  getCategoryDetails(params): Observable<any> {
     var url = this.apiConfig.hostUrl+"category/"+params.category;
       return this.http.get<any>(url).pipe(
         tap((res) => console.log(res))
       );
   }

   getLocationCategory(params):  Observable<any> {
      var url = this.apiConfig.addQueryParams('locationByCat',params);
      console.log(url);
      return this.http.get<any>(url).pipe(
        tap((res) => console.log(res))
      );
   }

}
