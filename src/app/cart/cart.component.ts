import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = [];
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
