import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})
export class RegisterClientComponent {

  phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  registerForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
        Validators.maxLength(35)
      ],
    ],
    password: [
      null, 
      [
        Validators.required
      ]
    ],
    lastname: [
      null, 
      [
        Validators.required,
        Validators.maxLength(35)
      ]
    ],
    role: [
      'client', 
      [
        Validators.required,
        Validators.maxLength(35)
      ]
    ],
    firstname: [
      null, 
      [
        Validators.required,
        Validators.maxLength(35)
      ]
    ],
    tel: [
      null,
      [
        Validators.pattern(this.phonePattern)
      ]
    ],
    status: [
      true,
      [
        Validators.required
      ]
    ],
  });

  userIsLoggedIn: boolean = false;
  phone: string = '';
  cpassword: any = null;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  async register() {

    if(this.isUserLoggedIn()) {
      console.log("REGISTER: USER CONNECTED");
      this.snackBar.open("Utilisateur déjà connecté!", "", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: 'warning'
      });
    } else {
      console.log("REGISTER: USER NONCONNECTED");
      let emailValue = this.registerForm.get("email")!.value;
      let passwordValue = this.registerForm.get("password")!.value;
      let lastnameValue =  this.registerForm.get("lastname")!.value;
      let roleValue =  this.registerForm.get("role")!.value;
      let firstnameValue =  this.registerForm.get("firstname")!.value;
      console.log(this.registerForm.get("status")!.value);

      if (
        emailValue != null &&
        passwordValue != null &&
        lastnameValue  != null &&
        roleValue != null &&
        firstnameValue != null
      ) {
        const userToCreate = new FormData();
        for (let elmKey in this.registerForm.controls) {
          let elmValue = this.registerForm.value[elmKey];
          userToCreate.append(elmKey, elmValue);
        }

        //faire la logique token
        //let token: string = "";
        //token = this.authService.getToken() as string;
        this.userService.createUser(userToCreate).subscribe((userCreated: any) => {
          if (userCreated.user!= null && userCreated.user != undefined) {
            console.log(userCreated.user)
            this.authService.setUserToDisplay(userCreated.user);
            this.snackBar.open("Connexion reussie!", "", {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'success'
            });
            this.registerForm.reset();
            this.router.navigate(['/home']);
            console.log("REGISTER: USER CREATE");
          } else {
            this.snackBar.open(userCreated.msg, "", {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'fail'
            });
          }
        });
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

  //firstname
  firstnameEmpty(): boolean {
    return this.showError("firstname", "required");
  }

  firstnameLength(): boolean {
    return this.registerForm.get('firstname')!.hasError('maxlength') 
      && this.registerForm.get('firstname')!.touched;
  }

  //lastname
  lastnameEmpty(): boolean {
    return this.showError("lastname", "required");
  }

  lastnameLength(): boolean {
    return this.registerForm.get('lastname')!.hasError('maxlength') 
      && this.registerForm.get('lastname')!.touched;
  }

  //username
  unameEmpty(): boolean {
    return this.showError("username", "required");
  }

  unameLength(): boolean {
    return this.registerForm.get('username')!.hasError('maxlength') 
      && this.registerForm.get('username')!.touched;
  }

  //email
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

  //tel
  formatInput(inputElement: HTMLInputElement) {
    // Get the raw input value
    let rawValue = inputElement.value.replace(/\D/g, '');

    // Apply phone number format (xxx) xxx-xxxx
    let formattedNumber = '';
    if (rawValue.length > 0) {
      formattedNumber = '(' + rawValue.substring(0, 3) + ') ' + rawValue.substring(3, 6) + '-' + rawValue.substring(6, 10);
    }
    
    // Update the input value with the formatted number
    inputElement.value = formattedNumber;
  }

  phoneFormat() {
    return this.registerForm.get('tel')!.hasError('pattern') 
      && this.registerForm.get('tel')!.touched;
  }

  //password
  passwordEmpty(): boolean {
    return this.showError("password", "required");
  }

  //cpassword
  cpasswordMatch(): boolean {
    if (this.registerForm.get('password')!.value != this.cpassword)
      return false;
    else return true;
  }

  private showError(
    field: "email" | "password" | "firstname" | "lastname" | "tel" | "username", 
    error: string): boolean {
    return (
      this.registerForm.controls[field].hasError(error) &&
      (this.registerForm.controls[field].dirty || this.registerForm.controls[field].touched)
    );
  }

}
