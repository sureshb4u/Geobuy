import { Component, OnInit } from '@angular/core';
import{ FilterService} from '../filter.service';
import { ActivatedRoute } from '@angular/router';
import {ProductsComponent} from '../products/products.component' 

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss']
})
export class GlobalFilterComponent implements OnInit {

  constructor(private filterService : FilterService, public router: ActivatedRoute, public productsComponent: ProductsComponent) { }

  categoryDetails = { subcategory:[]};
  
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
    this.filterService.getCategoryDetails(params).subscribe(response =>{ 
      this.categoryDetails = response;
    });
  }

  onChkChange(val){
    if(val)
        return false;
    else
        return true;
  }

  onApplyFilter (){
    
    this.router.queryParams.subscribe(params => {
      console.log(params);
      var sc=[]; var lf =[]; 
      for(var i=0; i < this.categoryDetails.subcategory.length; i++){
        if(this.categoryDetails.subcategory[i].checked){
          sc.push(this.categoryDetails.subcategory[i].id);
        }
      }
      for(var i=0; i < this.locationFilters.length; i++){
        if(this.locationFilters[i].checked){
          for(var j=0; j < this.locationFilters[i].orgs.length; j++)
            lf.push(this.locationFilters[i].orgs[j].orgid);
        }
      }
      var Qparams = { 'category': params.category, 'tittle' : params.tittle, subcategory : (sc != [] ? sc : '' ), orgIds : (lf !=[] ? lf : '')};
      this.productsComponent.getProducts(Qparams);
    })
  }
}
