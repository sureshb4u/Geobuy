import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import {ApiConfigService} from './api-config.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AppComponentService {

  constructor(private apiConfig: ApiConfigService, private http : HttpClient) { }

  getJsonData(data: Object): Observable<any> {
    
      var url = this.apiConfig.hostUrl+this.apiConfig.baseUrl+"login";
      console.log('url ::'+url );
      return this.http.post<any>(url, data).pipe(
        tap((res) => console.log(res))
      );
    }
}
