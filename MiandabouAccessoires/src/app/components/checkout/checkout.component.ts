import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  policyModal: boolean = false;
  methodModal: string = "";
  address: string = "";

  constructor (
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit () {
    this.cartService.getCartTotal().subscribe(subTotal => {
      this.subTotal = subTotal;
    });
    this.cartService.getCheckoutTotal().subscribe(total => {
      this.total = total;
    });
    this.cartService.getCoupon().subscribe(coupon => {
      this.coupon = coupon;
    });
    this.cartService.getDelivery().subscribe(delivery => {
      this.delivery = delivery;
    });
  }

  total: number = 0;
  subTotal: number = 0;
  coupon: number = 0;
  delivery: number = 0;

  paymentPage () {
    this.router.navigate(['/payment']);
  }

  openPolicyModal() {
    this.policyModal = true;
  }

  closePolicyModal () {
    this.policyModal = false;
  }

  methodInfosToDisplay (method: string) {
    this.methodModal = method;
  }

  validForm () {

  }

}
