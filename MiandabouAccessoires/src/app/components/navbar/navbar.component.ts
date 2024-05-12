import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';
import { UserToDisplay } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { ChartService } from '../../services/chart/chart.service';
import { environment } from '../../../environments/dev.environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userToDisplay$ = this.authService.getUserToDisplay();
  userToDisplay: UserToDisplay = {} as UserToDisplay;
  userSubscription: Subscription;
  isProfileDropdownOpen = false;
  isLanguagesDropdownOpen = false;

  constructor(
    private router: Router, 
    public authService: AuthService,
    private userService: UserService,
    private chartService: ChartService
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
    this.chartService.emptyChart();
    this.userService.clearData();
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  toogleLanguagesDropdown() {
    this.isLanguagesDropdownOpen = !this.isLanguagesDropdownOpen;
  }

}