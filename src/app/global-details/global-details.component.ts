import { Component, OnInit, AfterViewInit } from '@angular/core';
import{ ProductsService} from '../products.service';
import { ActivatedRoute,Router } from '@angular/router';
import{ HomeService} from '../home.service';

@Component({
  selector: 'app-global-details',
  templateUrl: './global-details.component.html',
  styleUrls: ['./global-details.component.scss']
})

export class GlobalDetailsComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    
  }
  constructor(
    private productsService : ProductsService, 
    public router: ActivatedRoute, 
    private appService: HomeService,
  public routes: Router) { }
  product:any;
  productDetails=[];
  selected=0;
  optionsSelect: Array<any>;
  categories = [];
  categoryNameMap={};

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

    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(position => {
          this.router.queryParams.subscribe(params => {
            var qP ={"lat": position.coords.latitude, "lon" : position.coords.longitude, "id" :params.id, "sid" : params.sid};
            this.getProducts(qP);
         })
        });
    } else {
        this.router.queryParams.subscribe(params => {
          var qP ={ "id" :params.id, "sid" : params.sid};
          this.getProducts(qP);
        })
    }
  
     

      
  }


  getProducts(params) {
    this.productsService.getProductDetails(params).subscribe(response =>{ 
      this.productDetails = response.productDetails;
      if(params.sid) {
        var sellerId = params.sid;  
        for(var i=0; i<response.productDetails.length; i++) {
          if(response.productDetails[i].orgid == sellerId) {
            this.product = response.productDetails[i];
          }
        }
      } else
        this.product = response.productDetails[0];
    });
  }

  onClickInfoView(params){
    console.log(params);
      if(params.orgid) {
        var sellerId = params.orgid;  
        for(var i=0; i<this.productDetails.length; i++) {
          if(this.productDetails[i].orgid == sellerId) {
            this.product = this.productDetails[i];
          }
        }
      } else
        this.product = this.productDetails[0];
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

  changeRoute(path){
    this.routes.navigate([path]);
  }
}

