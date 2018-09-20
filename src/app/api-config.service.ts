import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiConfigService {

  public hostUrl:string = "https://somebackendserver.com";
  public baseUrl:string = "/"
  constructor() { }

}
