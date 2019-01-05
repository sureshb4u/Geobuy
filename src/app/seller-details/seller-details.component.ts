import { Component, OnInit } from '@angular/core';
import { SellerService} from '../seller.service';
import { ActivatedRoute } from '@angular/router';
import{ HomeService} from '../home.service';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {

  constructor(private sellerService : SellerService, private router : ActivatedRoute, private appService: HomeService) { }

  productDetails =[];
  seller:any = {};
  selected=0;
  selectedTab=0;
  categoryNameMap={};
  categories = [];
  ngOnInit() {

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

    this.router.queryParams.subscribe(params => {
      this.getSellerDetails(params);
      
    });
      
  }

  getSellerDetails(params) {
    this.sellerService.getSellerDetails(params).subscribe(response => this.seller = response);
    console.log(this.seller);
  }

  calculatePrice(product) {
    var discount = 0;
    if(product.offer > 0) {
      discount = (parseFloat(product.offer) / 100) * product.price;
    }
    return parseFloat(''+(product.price - discount)).toFixed(0);
}

getReviewsLength(reviews){
  if(reviews) {
    var no =0;
    for(var i= 0; i <reviews.length; i++) {
        if(reviews[i].review) {
          no++;
        }

        if(i == reviews.length-1)
          return no +' reviews';
    }
  } else
      return 'No reviews yet';
}

}
