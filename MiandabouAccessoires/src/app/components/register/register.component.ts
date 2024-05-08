import { UserService } from './../../services/user/user.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/connection/auth.service';
import { User } from '../../interfaces/user.interface';
import { FileReaderService } from '../../services/file-reader/file-reader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  registerForm = this.formBuilder.group({
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
    username: [
      null, 
      [
        Validators.maxLength(35)
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
      null, 
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
    dateOfBirth: [null],
    department: [null],
    picture: [null],
    tel: [
      null,
      [
        Validators.pattern(this.phonePattern)
      ]
    ]
  });

  userIsLoggedIn: boolean = false;
  file: File | null = null;
  pic: any = null;
  phone: string = '';
  isImgExtension: boolean = true;
  cpassword: any = null;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private fileReaderService: FileReaderService,
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
      let lastnameValue =  this.registerForm.get("lastname")?.value;
      let roleValue =  this.registerForm.get("role")?.value;
      let firstnameValue =  this.registerForm.get("firstname")?.value;
      let dateOfBirthValue =  this.registerForm.get("dateOfBirth")?.value;
      let departmentValue =  this.registerForm.get("department")?.value;
      let pictureValue =  this.pic;
      let telValue =  this.registerForm.get("tel")?.value;

      if (
        emailValue != null &&
        passwordValue != null &&
        lastnameValue  != null &&
        roleValue != null &&
        firstnameValue != null
      ) {
        let userToCreate: User = {
          username: (usernameValue) ? usernameValue : undefined,
          password: passwordValue,
          lastname: lastnameValue,
          role: roleValue,
          firstname: firstnameValue,
          dateOfBirth: (dateOfBirthValue) ? dateOfBirthValue : undefined,
          department: (departmentValue) ? departmentValue : undefined,
          picture: pictureValue,
          tel: (telValue) ? telValue : undefined,
          email: emailValue,
          statut: "enable",
        };
        let token: string = "";
        if (roleValue == "admin" || roleValue == "employee")
          token = this.authService.getToken() as string;
        const userCreated = await this.userService.createUsers(userToCreate);//, token
        console.log(userCreated);
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

  fileChanged(event: any) {
    this.file = event.target.files[0];
    this.setPicture();
  }

  async setPicture( ) {
    if (this.file != null)
      this.pic = await this.fileReaderService.readFile(this.file);
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

  //date of birth

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
  
  //department
  updateDepartment(event: any) {
    this.registerForm.get('department')!.setValue(event.target.value);
  }

  //role
  updateRole(event: any) {
    this.registerForm.get('role')!.setValue(event.target.value);
  }

  //picture
  loadPicture(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.isImgExtension = this.pictureExtension(file.name);
    if (!this.isImgExtension) return;

    const output = document.getElementById('preview_img') as HTMLImageElement;

    output.src = URL.createObjectURL(file);
    output.onload = () => {
        URL.revokeObjectURL(output.src); // free memory
    };
  }

  pictureExtension (fileName: string): boolean {
    const type = fileName.split('.').pop() || '';
    if (type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'gif' || type == 'bmp') return true;
    else return false;
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
    field: "email" | "password" | "firstname" | "lastname" | "role" | "dateOfBirth" | "department" | "picture" | "tel" | "username", 
    error: string): boolean {
    return (
      this.registerForm.controls[field].hasError(error) &&
      (this.registerForm.controls[field].dirty || this.registerForm.controls[field].touched)
    );
  }
}
