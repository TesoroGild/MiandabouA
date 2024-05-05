import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../connection/auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
  
    constructor( 
      private snackBar: MatSnackBar, 
      private authService: AuthService,
      private router: Router
    ) { 
      //bdService.isAdmin;
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.authService.userIsLoggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
      
      if (this.authService.userIsAdmin) {
         return true;
      } else {
        this.snackBar.open("Rôle administrateur requis pour accéder à ce contenu!", "", {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'popup2'
        });
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });
        return false;
      }
    }
  
  }