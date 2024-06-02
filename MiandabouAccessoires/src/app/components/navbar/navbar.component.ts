import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';
import { UserToDisplay } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { CartService } from '../../services/cart/cart.service';
import { environment } from '../../../environments/dev.environment';
import { Subscription } from 'rxjs';
import { Modal } from 'flowbite'
import { ItemCaisse } from '../../interfaces/item.interface';
import { Coupon } from '../../interfaces/coupon.interface';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userToDisplay$ = this.authService.getUserToDisplay();
  userToDisplay: UserToDisplay = {} as UserToDisplay;
  userSubscription: Subscription;
  items: ItemCaisse[] = [];
  isProfileDropdownOpen = false;
  isLanguagesDropdownOpen = false;
  subTotal: number = 0;
  total: number = 0;
  couponsTotal: number = 0;
  coupons: Coupon[] = [];
  registerModal = false;
  updateModal = false;

  constructor(
    private router: Router, 
    public authService: AuthService,
    private userService: UserService,
    private cartService: CartService
  ) { 
    this.userSubscription = this.userToDisplay$.subscribe((u) => {
      this.userToDisplay = u;
    })
  }

  ngOnInit(): void {
    this.authService.userToDisplay.subscribe((data) => {
      this.userToDisplay = data;
      console.log(this.userToDisplay);
    });
    this.cartService.getItemsCaisseToDisplay().subscribe(items => {
      this.items = items;
    });
    this.cartService.getCaisseSubTotal().subscribe(subTotal => {
      this.subTotal = subTotal;
    });
    this.cartService.getCaisseTotal().subscribe(total => {
      this.total = total;
    });
    this.cartService.getCouponCaisseTotal().subscribe(total => {
      this.couponsTotal = total;
    })
    this.cartService.getCoupons().subscribe(coupons => {
      this.coupons = coupons;
    });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isLoggedIn () {
    return this.authService.isLoggedIn();
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.router.navigate(['/logout']);
    this.cartService.emptyCart();
    this.userService.clearData();
  }

  toogleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  toogleLanguagesDropdown() {
    this.isLanguagesDropdownOpen = !this.isLanguagesDropdownOpen;
  }

  picture() {
    if (this.userToDisplay.contenthash) return `${environment.backendUrl}/images/userPic/${this.userToDisplay.contenthash}`
    else return "../../../assets/img/user_icon.png";
  }

  selectedAllCoupons () {
    this.cartService.setAllCoupons();
  }

  setCoupon (coupon: Coupon, index: number) {
    this.cartService.setCoupon(coupon);
  }

  openRegisterModal () {
    this.registerModal = true;
  }

  closeRegisterModal () {
    this.registerModal = false;
  }

  openUpdateModal () {
    this.updateModal = true;
  }

  closeUpdateModal () {
    this.updateModal = false;
  }
}