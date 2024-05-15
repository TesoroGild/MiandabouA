import { Injectable } from '@angular/core';
import { Cart } from '../../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = {} as Cart;

  constructor() { }

  emptyCart() {
    this.cart = {} as Cart;
  }
}
