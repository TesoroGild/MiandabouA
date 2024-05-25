import { Component } from '@angular/core';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { environment } from '../../../environments/dev.environment';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/connection/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.getItemsCartToDisplay().subscribe(items => {
      this.cart = items;
    });
  }

  cart: ItemCart [] = [];
  total: number = 0;
  subTotal: number = 0;
  Tvq: number = 9.975;
  Tps: number = 5;
  paymentModal: boolean = false;
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

  getQuantityInCart (id: string) {
    return this.cartService.getQuantityBuy(id);
  }

  itemTotal (prx: string, qte: number) {
    return Number(prx) * qte;
  }

  totalCalculate () {
    return this.subTotal + Number(this.TvqCalculate()) + Number(this.TpsCalculate());
  }

  subTotalCalculate () {
    this.subTotal = this.cart.reduce((subTotal, cartItem) => {
      return subTotal + (Number(cartItem.item.price) * cartItem.quantityBuy);
    }, 0);
    return this.subTotal.toFixed(2);
  }

  TvqCalculate () {
    return (this.subTotal * (this.Tvq / 100)).toFixed(2);
  }

  TpsCalculate () {
    return (this.subTotal * (this.Tps / 100)).toFixed(2);
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

  order () {
    
  }

  buy () {

  }

  picture (item: ItemCart) {
    return `${environment.backendUrl}/images/itemPic/${item.item.contenthash}`
  }

  openPaymentModal() {
    this.paymentModal = true;
  }

  closePaymentModal() {
    this.paymentModal = false;
  }

}
