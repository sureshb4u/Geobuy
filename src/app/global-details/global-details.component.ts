import { Component, OnInit } from '@angular/core';
import{ ProductsService} from '../products.service';
import { ActivatedRoute } from '@angular/router';
import{ HomeService} from '../home.service';

@Component({
  selector: 'app-global-details',
  templateUrl: './global-details.component.html',
  styleUrls: ['./global-details.component.scss']
})

export class GlobalDetailsComponent implements OnInit {

  constructor(private productsService : ProductsService, public router: ActivatedRoute, private appService: HomeService) { }
  public map: any = { lat: 51.678418, lng: 7.809007 };
  product ={};
  productDetails=[];
  selected=0;
  longitude = 20.728218;
  latitude = 52.128973;
  public radioModel: string = 'Left';
  markers = [
  { latitude: 52.228973, longitude: 20.728218 }
  ];
  optionsSelect: Array<any>;

  categories = [];
  categoryNameMap={};

  ngOnInit() {
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log(window.navigator.geolocation);
    }
  
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
      console.log(params);
      this.getProducts(params);
   })

      this.optionsSelect = [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
      ];
  }

  showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude); 
}


placeMarker(position: any) {
  const lat = position.coords.lat;
  const lng = position.coords.lng;

  this.markers.push({ latitude: lat, longitude: lng });
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
}
