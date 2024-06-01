import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/connection/auth.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from '../../interfaces/user-credentials.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
        Validators.maxLength(35),
      ],
    ],
    password: [null, [Validators.required]],
  });

  userIsLoggedIn: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  async login() {

    if(this.isUserLoggedIn()) {
      console.log("LOGIN: USER CONNECTED");
      this.snackBar.open("Un utilisateur est déjà connecté!!!", "", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: 'warning'
      });
    } else {
      console.log("LOGIN: USER NONCONNECTED");
      let emailValue = this.loginForm.get("email")?.value;
      let passwordValue = this.loginForm.get("password")?.value;
      const userToConnect = new FormData();
      userToConnect.append("email", this.loginForm.get("email")?.value);
      userToConnect.append("password", this.loginForm.get("password")?.value);

      if (emailValue != null && passwordValue != null) {
        this.authService.logIn(userToConnect).subscribe((userConnected: any) => {
          console.log(userConnected.user);
          if (userConnected.user != null && userConnected.user != undefined) {
            this.authService.setUserToDisplay(userConnected.user);
            this.snackBar.open("Connexion reussie!", "", {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'success'
            });
            this.loginForm.reset();
            const currentUrl = this.router.url;
            //remplacer true
            if (currentUrl != "/cart") this.router.navigate(['']);
            else this.router.navigate(['/checkout'])
            console.log("LOGIN: USER CONNECTED");
          } else {
            this.snackBar.open(userConnected.msg, "", {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'fail'
            });
            this.loginForm.reset();
          }
        });
      } else this.loginForm.markAllAsTouched();
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

  emailEmpty(): boolean {
    return this.showError("email", "required");
  }

  emailFormat(): boolean {
    return this.loginForm.get('email')!.hasError('pattern') 
      && this.loginForm.get('email')!.touched;
  }

  emailLength(): boolean {
    return this.loginForm.get('email')!.hasError('maxlength') 
      && this.loginForm.get('email')!.touched;
  }

  passwordEmpty(): boolean {
    return this.showError("password", "required");
  }

  private showError(field: "email" | "password", error: string): boolean {
    return (
      this.loginForm.controls[field].hasError(error) &&
      (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched)
    );
  }
}
