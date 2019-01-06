import { Component, OnInit } from '@angular/core';
import{ HomeService} from '../home.service';
import { CommunicationService } from '../communication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appService: HomeService,private service:CommunicationService) { }

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
      console.log(this.service.getFilterData());
    }

    getTrendingProducts() {
      this.appService.getTrendings().subscribe(response => this.trendings = response);
    }

    setLocation(selectedLocation){
        console.log(selectedLocation);
    }
  }

  



