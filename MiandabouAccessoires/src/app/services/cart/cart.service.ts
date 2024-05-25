import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsCartSubject: BehaviorSubject<ItemCart[]>;

  cart: ItemCart[] = [];

  constructor (
    private itemService: ItemService
  ) {
    this.itemsCartSubject = new BehaviorSubject<ItemCart[]>([]);
  }

  setItemsCartToDisplay (items: ItemCart[]) {
    this.itemsCartSubject.next(items);
  }

  getItemsCartToDisplay () {
    return this.itemsCartSubject.asObservable();
  }

  getQuantityBuy (id: string) {
    let quantity = this.cart.find(item => item.item.id === id)?.quantityBuy;
    if (quantity) return quantity;
    else return 0;
  }

  emptyCart () {
    this.cart = [];
  }

  addToCart (itemToAdd: Item) {
    const index = this.cart.findIndex(item => item.item.id === itemToAdd.id);
    if (index !== -1) {
      this.cart[index].quantityBuy += 1;
    } else {
      this.cart.push({ item: itemToAdd, quantityBuy: 1 });
    }
    this.itemsCartSubject.next(this.cart);
  }

  removeFromCart (itemToRemove: Item) {
    const index = this.cart.findIndex(item => item.item.id === itemToRemove.id);
    if (index !== -1) {
      if (this.cart[index].quantityBuy > 1) {
        this.cart[index].quantityBuy -= 1;
      } else {
        this.cart.splice(index, 1);
      }
      this.itemsCartSubject.next(this.cart);
    }
  }

  deleteFromCart (itemToDelete: Item) {
    this.cart = this.cart.filter(item => item.item.id !== itemToDelete.id);
    this.itemsCartSubject.next(this.cart);
  }

  updateQuantity(itemToModify: Item, qte: number) {
    console.log(qte);
    const index = this.cart.findIndex(item => item.item.id === itemToModify.id);
    if (index !== -1) {
      if (qte > 0) {
        this.cart[index].quantityBuy = qte;
      } else if (qte <= 0) {
        this.deleteFromCart(itemToModify);
      } else {
        this.cart[index].quantityBuy = 0;
      }
      this.itemsCartSubject.next(this.cart);
    }
  }
}
