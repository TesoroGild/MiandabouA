import { Component } from '@angular/core';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { environment } from '../../../environments/dev.environment';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/connection/auth.service';
import { Router } from '@angular/router';
import { Coupon } from '../../interfaces/coupon.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.getItemsCartToDisplay().subscribe(items => {
      this.cart = items;
    });
    this.cartService.getSubTotal().subscribe(subTotal => {
      this.subTotal = subTotal;
    });
    this.cartService.getTvq().subscribe(tvq => {
      this.tvq = tvq;
    });
    this.cartService.getTps().subscribe(tps => {
      this.tps = tps;
    });
    this.cartService.getCartTotal().subscribe(total => {
      this.total = total;
    });
    this.cartService.getCouponTotal().subscribe(total => {
      this.couponsTotal = total;
    })
    this.cartService.getCoupons().subscribe(coupons => {
      this.coupons = coupons;
    });
  }

  cart: ItemCart [] = [];
  total: number = 0;
  subTotal: number = 0;
  tvq: number = 0;
  tps: number = 0;
  coupons: Coupon[] = [];
  couponsSelected: Coupon[] = [];
  couponsTotal: number = 0;
  paymentModal: boolean = false;
  couponsModal: boolean = false;
  loginModal: boolean = false;

  cartEmpty() {
    if (this.cart.length != 0)
      return false;
    else return true;
  }

  addToCart (item: Item) {
    this.cartService.addToCart(item);
  }

  removeFromCart (item: Item) {
    this.cartService.removeFromCart(item);
  }

  deleteFromCart (item: Item) {
    this.cartService.deleteFromCart(item);
  }

  updateQuantity(item: Item, qte: number) {
    this.cartService.updateQuantity(item, qte);
  }

  itemTotal (id: string) {
    return this.cartService.itemTotal(id);
  }

  subTotalCalculate () {
    // this.subTotal = this.cart.reduce((subTotal, cartItem) => {
    //   return subTotal + (Number(cartItem.item.price) * cartItem.quantityBuy);
    // }, 0);
    // return this.subTotal.toFixed(2);
    return this.cartService.subTotalCalculate();
  }

  tvqCalculate () {
    //return (this.subTotal * (this.tvq / 100)).toFixed(2);
    return this.cartService.tvqCalculate();
  }

  tpsCalculate () {
    //return (this.subTotal * (this.tps / 100)).toFixed(2);
    return this.cartService.tpsCalculate();
  }

  couponCalculate () {
    return this.cartService.couponCalculate(this.couponsSelected);
  }

  totalCalculate () {
    return this.cartService.totalCalculate();
  }

  isUserLoggedIn () {
    let userIsLoggedIn;
    this.authService.userIsLoggedIn.subscribe({
      next: (result) => {
        userIsLoggedIn = result;
      }
    });
    return userIsLoggedIn;
  }

  openLoginModal() {
    this.loginModal = true;
  }

  closeLoginModal() {
    this.loginModal = false;
  }

  picture (item: ItemCart) {
    return `${environment.backendUrl}/images/itemPic/${item.item.contenthash}`
  }

  checkoutPage() {
    this.router.navigate(['/checkout']);
  }

  openCouponsModal () {
    this.couponsModal = true;
    console.log(this.coupons)
  }

  closeCouponsModal () {
    this.couponsModal = false;
  }

}