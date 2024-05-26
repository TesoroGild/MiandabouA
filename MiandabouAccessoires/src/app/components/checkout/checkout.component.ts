import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  policyModal: boolean = false;
  methodModal: string = "";

  constructor (private router: Router) {}

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

  subTotal () {
    
  }

  couponReduction () {

  }

  deliveryPrice () {

  }

  total () {
    
  }
}
