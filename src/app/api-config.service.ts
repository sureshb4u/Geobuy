import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiConfigService {

  public hostUrl:string = "https://geobuy-viki19nesh.c9users.io/";
  constructor() { }

  addQueryParams(url, param) {
    var qP = this.hostUrl+url;
    var isFirst = true;
    var keys = Object.keys(param);
    for(var i=0;i<keys.length;i++){
        var key = keys[i];
        console.log(key, param[key]);
        if(isFirst) {
          isFirst = false;
          qP = qP+'?'+key+'='+param[key];
        } else {
          qP = qP+'&'+key+'='+param[key];
        }

        if(i==keys.length-1) {
          return qP;
        }
    }
   
  }

}
