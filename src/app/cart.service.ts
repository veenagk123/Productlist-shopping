import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: any) {
    const cartItems = this.cartItemsSubject.value;
    const index = cartItems.findIndex(p => p.imageUrl === product.imageUrl);
    if (index !== -1) {
      cartItems[index].quantity += product.quantity;
    } else {
      cartItems.push({...product});
    }
    this.cartItemsSubject.next(cartItems);
    product.quantity = 0;
  }
  removeFromCart(product: any) {
    const cartItems = this.cartItemsSubject.value;
    const index = cartItems.findIndex(p => p.imageUrl === product.imageUrl);
    if (index !== -1) {
      cartItems.splice(index, 1);
      this.cartItemsSubject.next(cartItems);
    }
  }
  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getTotal() {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  constructor() { }
}
