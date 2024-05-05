import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/connection/auth.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { UserCredentials } from '../../interfaces/user-credentials.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
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
      this.snackBar.open("Un utilisateur est déjà connecté!!!", "", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: 'popup2'
      });
    } else {
      let emailValue = this.loginForm.get("email")?.value;
      let passwordValue = this.loginForm.get("password")?.value;

      if (emailValue != null && passwordValue != null) {
        let userCredentials: UserCredentials = {
          email: emailValue,
          password: passwordValue,
        };
        const userToDisplay = await this.authService.logIn(userCredentials);
        if (userToDisplay.fname != null && userToDisplay.fname != '') {
          this.snackBar.open("Connexion reussie!", "", {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'popup2'
          });
          this.loginForm.reset();
          this.router.navigate(['']);
        }
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

  emailInvalid(): boolean {
    return this.showError("email", "required");
  }

  passwordInvalid(): boolean {
    return this.showError("password", "required");
  }

  private showError(field: "email" | "password", error: string): boolean {
    return (
      this.loginForm.controls[field].hasError(error) &&
      (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched)
    );
  }
}
