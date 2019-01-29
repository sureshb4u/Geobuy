import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

  filterData ;

  setFilterData (data){
    this.filterData = data;
  }

  getFilterData (){
      return this.filterData;
  } 
}
