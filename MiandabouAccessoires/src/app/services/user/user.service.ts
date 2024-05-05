import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  constructor() { }

  getUsers() {

  }
  
  clearData() {
    this.users = [];
  }
}
