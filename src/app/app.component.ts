import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './communication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent {
  filterObj:any = {};
  constructor(private service: CommunicationService){

  }
 
  setLocation(selectedLocation ){
      this.filterObj.location = selectedLocation;
      this.service.setFilterData(this.filterObj);
  }
}
