import { Component, ElementRef, ViewChild, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  checkoutForm: FormGroup = this.formBuilder.group({
    firstname: [
      null, 
      [
        Validators.required,
        Validators.maxLength(35)
      ]
    ],
    lastname: [
      null, 
      [
        Validators.required,
        Validators.maxLength(35)
      ]
    ],
    email: [
      null,
      [
        Validators.required,
        Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
        Validators.maxLength(35),
      ],
    ]
  });

  policyModal: boolean = false;
  methodModal: string = "";
  address: string = "";
  private apiUrl = 'https://restcountries.com/v3.1/all';
  countries: any[] = [];

  constructor (
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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
    //COUNTRIES WITH FLAGS API
    //this.getCountries().subscribe(data => {
    //  this.filterCountries(data);
    //});
    this.autoCompleteAddress();
  }

  ngAfterViewInit () {
    const input = document.getElementById('location-input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['address_components', 'geometry', 'name'],
      types: ['address'],
      componentRestrictions: { country: 'ca' }
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert(`No details available for input: '${place.name}'`);
        return;
      }
      this.fillInAddress(place);
    });
  }

  total: number = 0;
  subTotal: number = 0;
  coupon: number = 0;
  delivery: number = 0;
  //coutriesDropdownOpen = false;
  //selectedCountry: any;

  //COUNTRIES WITH FLAGS AND DROPDOWN
  // getCountries(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  
  // filterCountries (data: any) {
  //   let countriesSorted = [];
  //   countriesSorted = data.sort(
  //     (a:any, b:any) => a.name.official.localeCompare(b.name.official)
  //   );
  //   this.countries = countriesSorted;
  // }

  
  // toggleCoutriesDropdown(): void {
  //   this.coutriesDropdownOpen = !this.coutriesDropdownOpen;
  // }

  // selectCountry(country: any): void {
  //   this.selectedCountry = country;
  //   this.coutriesDropdownOpen = false;
  // }

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
    // console.log("CHECKOUT: VALID FORM");
    // let firstNameValue = this.checkoutForm.get("firstName")?.value;
    // let lastNameValue = this.checkoutForm.get("lastName")?.value;
    // let emailValue = this.checkoutForm.get("email")?.value;
      
    // const orderToCreate = new FormData();
    // orderToCreate.append("firstName", this.checkoutForm.get("firstName")?.value);
    // orderToCreate.append("lastName", this.checkoutForm.get("lastName")?.value);
    // orderToCreate.append("email", this.checkoutForm.get("email")?.value);
    
    // if (emailValue != null && firstNameValue != null
    //   && lastNameValue != null
    // ) {
    //   this.checkoutService.order(orderToCreate).subscribe((orderCreated: any) => {
    //     console.log(orderCreated);
    //     if (orderCreated.oder != null && orderCreated.oder != undefined) {
    //       this.snackBar.open(orderCreated.msg, "", {
    //         duration: 3000,
    //         horizontalPosition: 'center',
    //         verticalPosition: 'bottom',
    //         panelClass: 'success'
    //       });
    //       this.checkoutForm.reset();
    //       this.router.navigate(['']);
    //     } else {
    //       this.snackBar.open(orderCreated.msg, "", {
    //         duration: 3000,
    //         horizontalPosition: 'center',
    //         verticalPosition: 'bottom',
    //         panelClass: 'fail'
    //       });
    //       this.checkoutForm.reset();
    //     }
    //   });
    // } else this.checkoutForm.markAllAsTouched();
  }

  autoCompleteAddress() {
    
  }

  fillInAddress(place: google.maps.places.PlaceResult) {
    const addressComponents: { [key: string]: string } = {};
    for (const component of place.address_components || []) {
      const addressType = component.types[0];
      addressComponents[addressType] = component.long_name;
    }

    // Fill in address form fields
    (document.getElementById('location-input') as HTMLInputElement).value =
      `${addressComponents['street_number'] || ''} ${addressComponents['route'] || ''}`.trim();
    (document.getElementById('locality-input') as HTMLInputElement).value = addressComponents['locality'] || '';
    (document.getElementById('administrative_area_level_1-input') as HTMLInputElement).value =
      addressComponents['administrative_area_level_1'] || '';
    (document.getElementById('postal_code-input') as HTMLInputElement).value = addressComponents['postal_code'] || '';
    (document.getElementById('country-input') as HTMLInputElement).value = addressComponents['country'] || '';
  }

}