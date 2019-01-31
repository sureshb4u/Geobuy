import { Component, OnInit } from '@angular/core';
import{ HomeService} from '../home.service';
import {Router} from "@angular/router";
import { CommunicationService } from '../communication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private appService: HomeService, private router: Router,private service:CommunicationService) { }

  masterCategories;
  categories = [];
  trendings =[];
  offers=[];
  categoryNameMap={};


    ngOnInit() {
      this.appService.getMasterCategory()
      .subscribe(response => this.masterCategories = response) ;
      this.appService.getCategories()
      .subscribe(response => {
        this.categories = response.data
        for(var i=0; i<this.categories.length; i++){
          var subcategories = this.categories[i].subcategory;
          for(var j=0; j<subcategories.length; j++){
            this.categoryNameMap[subcategories[j].id] = subcategories[j].tittle;
          }
        }
      }) ;
      this.getTrendingProducts();
      console.log(this.service.getFilterData());
    }

    getTrendingProducts() {
      this.appService.getTrendings().subscribe(response => {
        this.trendings = response;
        console.log(response)
        for(var i=0; i<response.length; i++) {
          if(response[i].isBanner)
              this.offers.push(response[i]);
        }
      
      });
    }

    setLocation(selectedLocation){
        console.log(selectedLocation);
    }

    openOffers(offer){
      var linkId;
      if(offer.isOrg) {
        linkId = offer.linkId;
        console.log('org');
        this.router.navigate(['/seller'], { queryParams: { orgid:linkId}});
      } else if(offer.isProducts) {
        linkId = offer.linkId;
        console.log('isProducts');
        this.router.navigate(['/products'], { queryParams: { productIds: linkId, tittle : offer.tittle}});
      }
      console.log(linkId);
    }
  }

  



