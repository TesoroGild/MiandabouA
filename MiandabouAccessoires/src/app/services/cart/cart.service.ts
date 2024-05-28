import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsCartSubject: BehaviorSubject<ItemCart[]>;
  private cartTotalSubject: BehaviorSubject<number>;
  private checkoutTotalSubject: BehaviorSubject<number>;
  private subTotalSubject: BehaviorSubject<number>;
  private tvqSubject: BehaviorSubject<number>;
  private tpsSubject: BehaviorSubject<number>;
  private deliverySubject: BehaviorSubject<number>;
  private couponSubject: BehaviorSubject<number>;

  cart: ItemCart[] = [];
  cartTotal: number = 0;
  subTotal: number = 0;
  tvqRate: number = 9.975;
  tvq: string = "0";
  tpsRate: number = 5;
  tps: string = "0";
  delivery: number = 50
  coupon: number = 0;

  constructor (
    private itemService: ItemService
  ) {
    this.itemsCartSubject = new BehaviorSubject<ItemCart[]>([]);
    this.cartTotalSubject = new BehaviorSubject<number>(0);
    this.checkoutTotalSubject = new BehaviorSubject<number>(0);
    this.subTotalSubject = new BehaviorSubject<number>(0);
    this.tvqSubject = new BehaviorSubject<number>(0);
    this.tpsSubject = new BehaviorSubject<number>(0);
    this.couponSubject = new BehaviorSubject<number>(0);
    this.deliverySubject = new BehaviorSubject<number>(50);
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
    this.subTotalCalculate();
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
      this.subTotalCalculate();
    }
  }

  deleteFromCart (itemToDelete: Item) {
    this.cart = this.cart.filter(item => item.item.id !== itemToDelete.id);
    this.itemsCartSubject.next(this.cart);
    this.subTotalCalculate();
  }

  updateQuantity(itemToModify: Item, qte: number) {
    console.log(qte);
    const index = this.cart.findIndex(item => item.item.id === itemToModify.id);
    if (index !== -1) {
      if (qte > 0) {
        this.cart[index].quantityBuy = qte;
      } else {
        this.cart[index].quantityBuy = 0;
      }
      this.itemsCartSubject.next(this.cart);
      this.subTotalCalculate();
    }
  }

  itemTotal (id: string) {
    let quantity = this.cart.find(it => it.item.id === id)?.quantityBuy;
    let price = this.cart.find(it => it.item.id === id)?.item.price;
    if (quantity && price) return quantity * Number(price);
    else return 0;
  }

  subTotalCalculate () {
    this.subTotal = this.cart.reduce((subTotal, cartItem) => {
      return subTotal + (Number(cartItem.item.price) * cartItem.quantityBuy);
    }, 0);
    this.subTotalSubject.next(parseFloat(this.subTotal.toFixed(2)));
    this.tvqCalculate();
  }

  getSubTotal () {
    return this.subTotalSubject.asObservable();
  }

  tvqCalculate () {
    this.tvq = (this.subTotal * (this.tvqRate / 100)).toFixed(2);
    this.tvqSubject.next(parseFloat(this.tvq));
    this.tpsCalculate();
  }

  getTvq () {
    return this.tvqSubject.asObservable();
  }

  tpsCalculate () {
    this.tps = (this.subTotal * (this.tpsRate / 100)).toFixed(2);
    this.tpsSubject.next(parseFloat(this.tps));
    this.totalCalculate();
  }

  getTps () {
    return this.tpsSubject.asObservable();
  }

  totalCalculate () {
    this.cartTotalSubject.next(this.subTotal + Number(this.tvq) + Number(this.tps));
  }

  getCartTotal () {
    return this.cartTotalSubject.asObservable();
  }

  couponCalcultate () {
    this.coupon = parseFloat((this.subTotal * this.coupon / 100).toFixed(2));
    this.couponSubject.next(this.coupon);
  }

  getCoupon () {
    return this.couponSubject.asObservable();
  }

  deliveryCalcultate () {
    //this.delivery = parseFloat((this.subTotal *  / 100).toFixed(2));
    this.deliverySubject.next(this.delivery);
  }

  getDelivery () {
    return this.deliverySubject.asObservable();
  }

  totalCheckout () {
    this.checkoutTotalSubject.next(this.subTotal + Number(this.tvq) + Number(this.tps) - this.coupon);
  }

  getCheckoutTotal () {
    return this.checkoutTotalSubject.asObservable();
  }
}
