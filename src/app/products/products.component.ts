import { Component, OnInit } from '@angular/core';
import{ ProductsService} from '../products.service';
import{ HomeService} from '../home.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService : ProductsService, private homeService: HomeService) { }

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
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(response => this.products = response);
  }
}
