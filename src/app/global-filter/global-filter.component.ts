import { Component, OnInit } from '@angular/core';
import{ FilterService} from '../filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss']
})
export class GlobalFilterComponent implements OnInit {

  constructor(private filterService : FilterService, public router: ActivatedRoute) { }

  categoryDetails = {};
  
  locationFilters = [];


  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.getCategoryDetails(params);
      if(window.navigator.geolocation)  {
          window.navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude+'         '+position.coords.longitude);
            this.getLocationByCategory(params, position.coords.latitude, position.coords.longitude);  
          });
      } 
    })
    

    
  }

  getLocationByCategory(params, lat, lon) {
    if(lat && lon) {
      var Qp = {'category':params.category, 'lat':lat , 'lon':lon};
      this.filterService.getLocationCategory(Qp).subscribe(response =>{ 
            this.locationFilters = response;
      });
    }
  }

  getCategoryDetails(params) {
    console.log('**********');
    console.log(params);
    console.log('**********');
    this.filterService.getCategoryDetails(params).subscribe(response =>{ 
  //    console.log(response);
      this.categoryDetails = response;
    });
  }

  onChkChange(val){
    if(val)
        return false;
    else
        return true;
    
  }
}
