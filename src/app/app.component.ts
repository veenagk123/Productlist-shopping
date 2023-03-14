import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import productData from './products.json';  

interface Product {  

  id: Number;  
  style: String;  
  price : Number;  
  title: String;  
  // availableSizes : String[];
  currencyFormat : String;
  currencyId:String;
  description:String;
  // imageUrl: string;
  imageUrl?: string;
  installments:Number;
  isFreeShipping: Boolean ;
  sku: Number;
  quantity?: Number;
  
} 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  sizes = ['S', 'M', 'L'];
  selectedSize: string;
  @Output() sizeSelected = new EventEmitter<string>();
  name = 'Angular';  
  
  constructor() {
    this.selectedSize = '';
    
   }

  products : Product[] = productData; 
  cart: any[] = [];
  selectSize(size: string) {
    this.selectedSize = size;
  }
  addToCart(product: Product) {
    console.log('Selected size:', this.selectedSize);
    // check if product is already in cart
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      // increment quantity if product is already in cart
      this.cart[index].quantity++;
    } else {
      // set quantity to 1 if product is not in cart
      product.quantity = 1;
      this.cart.push(product);
    }
  }
 
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  removeFromCart(item: Product) {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }
}

