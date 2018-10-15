import { Component, OnInit } from '@angular/core';
import{ ProductsService} from '../products.service';
import{ HomeService} from '../home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService : ProductsService, private homeService: HomeService, public router: ActivatedRoute) {  }

  products =[];
  masterCategories;
  categories = [];
  categoryNameMap={};

  ngOnInit() {
    
    this.homeService.getMasterCategory()
      .subscribe(response => this.masterCategories = response) ;
      this.homeService.getCategories()
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
        console.log(params);
        this.getProducts(params);
     })
   
  }

  getProducts(params) {
    this.productsService.getProducts(params).subscribe(response => this.products = response);
  }

  calculatePrice(product) {
    var discount = 0;
    if(product.offer > 0) {
      discount = (parseFloat(product.offer) / 100) * product.price;
    }
    return parseFloat(''+(product.price - discount)).toFixed(0);
}
}
