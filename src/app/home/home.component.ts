import { Component, OnInit } from '@angular/core';
import{ HomeService} from '../home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appService: HomeService) { }

  masterCategories;
  categories = [];
  trendings =[];
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
    }

    getTrendingProducts() {
      this.appService.getTrendings().subscribe(response => this.trendings = response);
    }

    setLocation(selectedLocation ){
        console.log(selectedLocation);
    }
  }

  



