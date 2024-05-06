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

  userIsLoggedOut: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  async logout() {
    const logoutSucced = await this.authService.logOut();
    if (logoutSucced) {
      this.snackBar.open("Utilisateur déconnecté!", "", {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'success'
      });
      this.router.navigateByUrl("/home");
    } else {
      this.snackBar.open("Erreur serveur!", "", {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'warning'
      }); 
    }
  }

}
