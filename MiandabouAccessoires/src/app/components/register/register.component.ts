import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
        Validators.maxLength(35),
      ],
    ],
    password: [null, [Validators.required]],
    username: [null, [Validators.required]],
    lname: [null, [Validators.required]],
    role: [null, [Validators.required]],
    fname: [null, [Validators.required]],
    dateOfBith: [null, [Validators.required]],
    department: [null, [Validators.required]],
    picture: [null, [Validators.required]],
    tel: [null, [Validators.required]],
    statut: [null, [Validators.required]],
  });

  userIsLoggedIn: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  async register() {

    if(this.isUserLoggedIn()) {
      console.log("LOGIN: USER CONNECTED");
      this.snackBar.open("Vous devez d'abord vous déconnecter!", "", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: 'warning'
      });
    } else {
      console.log("LOGIN: USER NONCONNECTED");
      let emailValue = this.registerForm.get("email")?.value;
      let passwordValue = this.registerForm.get("password")?.value;
      let usernameValue =  this.registerForm.get("username")?.value;
      let lnameValue =  this.registerForm.get("lname")?.value;
      let roleValue =  this.registerForm.get("role")?.value;
      let fnameValue =  this.registerForm.get("fname")?.value;
      let dateOfBithValue =  this.registerForm.get("dateOfBith")?.value;
      let departmentValue =  this.registerForm.get("department")?.value;
      let pictureValue =  this.registerForm.get("picture")?.value;
      let telValue =  this.registerForm.get("tel")?.value
      let statutValue =  this.registerForm.get("statut")?.value;

      if (
        emailValue != null &&
        passwordValue != null &&
        usernameValue != null &&
        lnameValue  != null &&
        roleValue != null &&
        fnameValue != null &&
        dateOfBithValue != null &&
        statutValue != null
      ) {
        let userToCreate: User = {
          username: usernameValue,
          password: passwordValue,
          lname: lnameValue,
          role: roleValue,
          fname: fnameValue,
          dateOfBith: dateOfBithValue,
          department: departmentValue,
          picture: pictureValue,
          tel: telValue,
          email: emailValue,
          statut: statutValue
        };
        const userCreated = await this.userService.createUsers(userToCreate);
        if (userCreated.username != null && userCreated.username != '') {
          this.snackBar.open("Connexion reussie!", "", {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success'
          });
          this.registerForm.reset();
          this.router.navigate(['']);
        }
      } else this.registerForm.markAllAsTouched();
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
    return this.registerForm.get('email')!.hasError('pattern') 
      && this.registerForm.get('email')!.touched;
  }

  emailLength(): boolean {
    return this.registerForm.get('email')!.hasError('maxlength') 
      && this.registerForm.get('email')!.touched;
  }

  passwordEmpty(): boolean {
    return this.showError("password", "required");
  }

  private showError(field: "email" | "password", error: string): boolean {
    return (
      this.registerForm.controls[field].hasError(error) &&
      (this.registerForm.controls[field].dirty || this.registerForm.controls[field].touched)
    );
  }

}
