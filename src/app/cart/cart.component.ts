import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../window-ref.service';
import { ApiConfigService } from '../api-config.service'
import { CartService } from '../cart.service'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  rzp1: any;
  config = new ApiConfigService();
  options = {
    'key': this.config.RAZORPAY_KEY,
    'amount': '2000', // 2000 paise = INR 20
    'name': 'Merchant Name',
    'description': 'Purchase Description',
    'image': '/assets/images/Geobuy_white.png',
    'handler': function(response) {
        alert(response.razorpay_payment_id);
    },
    'prefill': {
        'name': 'Harshil Mathur',
        'email': 'harshil@razorpay.com'
    },
    'notes': {
        'address': 'Hello World'
    },
    'theme': {
        'color': '#E5074B'
    }
  };

  cartProducts: any;

  constructor(private winRef : WindowRefService, private cartService : CartService) { }

  ngOnInit() {
      this.cartService.getCartItems().subscribe(response => {
   //     console.log(response);
        var user = response;
        var quanityMap= {};
        for(var i=0; i<user.cart.length; i++) {
          quanityMap[user.cart[i].id] = user.cart[i].quanity; 
        }
        for(var i=0; i<user.products.length; i++) {
          user.products[i].quanity = quanityMap[user.products[i].id]; 
        }
        this.cartProducts = user.products;
        console.log(this.cartProducts);
      });
  }

  public initPay(): void {
    this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }

  calculatePrice(product) {
    var discount = 0;
    if(product.offer > 0) {
      discount = (parseFloat(product.offer) / 100) * product.price;
    }
    return parseFloat(''+((product.price - discount) * product.quanity)).toFixed(0);
  }

  changeQuanity(product, evnt){
   var val = evnt.target.value;
   for(var j=0; j<this.cartProducts.length; j++) {
    if(this.cartProducts[j].id == product.id) {
      this.cartProducts[j].quanity = val;
      if(val !='' && val==0){
        alert()
        this.cartProducts.splice(j, 1);
      } 
    }
   }
      
   // console.log('*******--'+product.quanity);

  }
}
