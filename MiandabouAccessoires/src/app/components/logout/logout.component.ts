import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  userIsLoggedIn: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    if (this.isUserLoggedIn()) {
      this.authService.logOut().subscribe((userLogout: any) => {
        console.log(userLogout.msg);
        if (userLogout.msg.trim() != "") {
          this.authService.unsetUserToDisplay();
          this.snackBar.open(userLogout.msg, "", {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success'
          });
          this.router.navigate(['/home']);
          console.log("LOGIN: USER CONNECTED");
        } else {
          this.snackBar.open("Erreur lors de la déconnection!", "", {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'fail'
          });
        }
      });
    }
  }

  isUserLoggedIn() {
    this.authService.userIsLoggedIn.subscribe({
      next: (result)=> {
        this.userIsLoggedIn = result;
      }
    })
    return this.userIsLoggedIn; 
  }
    
}
