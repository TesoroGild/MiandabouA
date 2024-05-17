import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsCartSubject = new BehaviorSubject<ItemCart[]>([]);

  cart: ItemCart[] = [];

  // testItem: Item[] = [];
  // testCart: ItemCart[] = [
  //   {
  //     item: this.testItem[0],
  //     quantityBuy: 3
  //   }, 
  //   {
  //     item: this.testItem[1],
  //     quantityBuy: 1
  //   }, 
  //   {
  //     item: this.testItem[2],
  //     quantityBuy: 2
  //   }, 
  //   {
  //     item: this.testItem[3],
  //     quantityBuy: 3
  //   },
  //   {
  //     item: this.testItem[4],
  //     quantityBuy: 1
  //   }
  // ]

  constructor (
    private itemService: ItemService
  ) { 
    //A remplacer par les vraies valeurs
    this.setItemsCartToDisplay(this.testCart);
    this.itemService.getItemsToDisplay().subscribe(items => {
      this.testItem = items;
      console.log(this.testItem)
    })
  }

  setItemsCartToDisplay (items: ItemCart[]) {
    this.itemsCartSubject.next(items);
    //return this.itemsCartSubject.asObservable();
  }

  getItemsCartToDisplay () {
    return this.itemsCartSubject.asObservable();
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
}
