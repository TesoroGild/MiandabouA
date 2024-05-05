import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { ChartService } from '../../services/chart/chart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userToDisplay: User = {} as User;

  constructor(
    //private snackBar: MatSnackBar, 
    private http : HttpClient, 
    private router: Router, 
    public authService: AuthService,
    private userService: UserService,
    private chartService: ChartService
  ) { }


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
      return this.userToDisplay.picture;
    else return 'user_icon.png';
  }
}
