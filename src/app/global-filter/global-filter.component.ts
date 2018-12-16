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
    if(window.navigator.geolocation)  {
      window.navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude+'         '+position.coords.longitude);
        
        this.router.queryParams.subscribe(params => {
          this.getCategoryDetails(params);
          this.getLocationByCategory(params, position.coords.latitude, position.coords.longitude);
        })

      });
    } else {
        this.router.queryParams.subscribe(params => {
          this.getCategoryDetails(params);
        })
    }

    
  }

  getLocationByCategory(params, lat, lon) {
    var Qp = {'category':params.category, 'lat':lat , 'lon':lon};
    this.filterService.getLocationCategory(Qp).subscribe(response =>{ 
          this.locationFilters = response;
    });
  }

  getCategoryDetails(params) {
    this.filterService.getCategoryDetails(params).subscribe(response =>{ 
  //    console.log(response);
      this.categoryDetails = response;
    });
  }
}
