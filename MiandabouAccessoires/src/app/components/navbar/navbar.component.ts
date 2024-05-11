import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserToDisplay } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { ChartService } from '../../services/chart/chart.service';
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

  picture() {
    if (this.isLoggedIn())
      return this.userToDisplay.contenthash;
    else return 'user_icon.png';
  }
}
