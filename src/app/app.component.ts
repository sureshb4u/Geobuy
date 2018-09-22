import { Component, OnInit } from '@angular/core';
import{AppComponentService} from './app-component.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private appService: AppComponentService){

  }
  masterCategories;
  categories = [];
  ngOnInit() {
    this.appService.getMasterCategory()
    .subscribe(response => this.masterCategories = response) ;
    this.appService.getCategories()
    .subscribe(response => this.categories = response.data) ;
  }


}
