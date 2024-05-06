import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  constructor() { }

  getUsers(): any {

  }
  
  createUsers(user: User): any {
    
  }

  updateUsers(user: User): any {
    
  }

  enableUsers(id: string) {
    
  }

  disableUsers(id: string) {
    
  }

  clearData() {
    this.users = [];
  }
}
