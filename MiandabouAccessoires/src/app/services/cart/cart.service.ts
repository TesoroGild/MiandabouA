import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { ItemService } from '../item/item.service';
import { Coupon } from '../../interfaces/coupon.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/dev.environment';

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
  private couponsSubject: BehaviorSubject<Coupon[]>;
  private couponsTotalSubject: BehaviorSubject<number>;

  cart: ItemCart[] = [];
  cartTotal: number = 0;
  subTotal: number = 0;
  tvqRate: number = 9.975;
  tvq: string = "0";
  tpsRate: number = 5;
  tps: string = "0";
  delivery: number = 50;
  couponTotal: number = 0;
  coupons: Coupon[] = [];
  couponsSelected: Coupon[] = [];

  constructor (
    private itemService: ItemService,
    private http: HttpClient
  ) {
    this.itemsCartSubject = new BehaviorSubject<ItemCart[]>([]);
    this.cartTotalSubject = new BehaviorSubject<number>(0);
    this.checkoutTotalSubject = new BehaviorSubject<number>(0);
    this.subTotalSubject = new BehaviorSubject<number>(0);
    this.tvqSubject = new BehaviorSubject<number>(0);
    this.tpsSubject = new BehaviorSubject<number>(0);
    this.couponsTotalSubject = new BehaviorSubject<number>(0);
    this.couponsSubject = new BehaviorSubject<Coupon[]>([]);
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
    this.couponCalculate();
  }

  getTps () {
    return this.tpsSubject.asObservable();
  }

  totalCalculate () {
    this.cartTotalSubject.next(this.subTotal + Number(this.tvq) + Number(this.tps) - this.couponTotal);
  }

  getCartTotal () {
    return this.cartTotalSubject.asObservable();
  }

  couponCalculate () {
    this.couponTotal = 0;
    console.log("TEST COUPON CALCUL")
    
    if (this.couponsSelected.length !== 0) {
      this.couponsSelected.forEach(selectedCoupon => {
        const coupon = this.coupons.find(c => c.name === selectedCoupon.name);

        if (coupon) {
          if (coupon.value != 0) {
            this.couponTotal += Number(coupon.value);
          }
          if (coupon.rate != 0) {
            this.couponTotal += parseFloat((this.subTotal * (coupon.rate / 100)).toFixed(2));
          }
        }
      });
    }
    
    this.couponsTotalSubject.next(this.couponTotal);
    this.totalCalculate();
  }

  getCouponTotal () {
    return this.couponsTotalSubject.asObservable();
  }

  getCoupons () {
    this.http.get<any>(
      `${environment.backendUrl}/php/coupons/couponsGet.php`
    ).subscribe((couponsFounded: any) => {
      if (couponsFounded.coupons != null && couponsFounded.coupons != undefined)
        this.coupons = couponsFounded.coupons;

      this.couponsSubject.next(this.coupons);
      return this.couponsSubject.asObservable();
    });
    return this.couponsSubject.asObservable();
  }

  setAllCoupons () {
    this.couponsSelected = this.coupons;
  }

  cancelCoupons () {
    this.couponsSelected = [];
    this.couponCalculate();
  }

  setCoupon (couponToAdd: Coupon) {
    const index = this.couponsSelected.findIndex(coupon => coupon.name === couponToAdd.name);
    if (index === -1) {
      this.couponsSelected.push(couponToAdd);
    } else {
      this.couponsSelected.splice(index, 1);
    }
  }

  deliveryCalcultate () {
    //this.delivery = parseFloat((this.subTotal *  / 100).toFixed(2));
    this.deliverySubject.next(this.delivery);
  }

  getDelivery () {
    return this.deliverySubject.asObservable();
  }

  totalCheckout () {
    this.checkoutTotalSubject.next(this.subTotal + Number(this.tvq) + Number(this.tps) - this.couponTotal + this.delivery);
  }

  getCheckoutTotal () {
    return this.checkoutTotalSubject.asObservable();
  }
}
