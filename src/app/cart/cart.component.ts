import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../window-ref.service';
import { ApiConfigService } from '../api-config.service'



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
    'image': '/your_logo.png',
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

  constructor(private winRef : WindowRefService) { }

  ngOnInit() {
  }

  public initPay(): void {
    this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }

}
