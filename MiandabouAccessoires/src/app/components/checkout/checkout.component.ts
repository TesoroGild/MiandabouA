import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  policyModal: boolean = false;
  methodModal: string = "";
  address: string = "";
  private apiUrl = 'https://restcountries.com/v3.1/all';
  countries: any[] = [];

  constructor (
    private http: HttpClient,
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
    this.getCountries().subscribe(data => {
      console.log(data)
      this.filterCountries(data);
    });
  }

  total: number = 0;
  subTotal: number = 0;
  coupon: number = 0;
  delivery: number = 0;
  coutriesDropdownOpen = false;
  selectedCountry: any;

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  filterCountries (data: any) {
    let countriesSorted = [];
    countriesSorted = data.sort(
          (a:any, b:any) => a.name.official.localeCompare(b.name.official)
    );
    this.countries = countriesSorted;
  }

  toggleCoutriesDropdown(): void {
    this.coutriesDropdownOpen = !this.coutriesDropdownOpen;
  }

  selectCountry(country: any): void {
    this.selectedCountry = country;
    this.coutriesDropdownOpen = false;
  }

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
