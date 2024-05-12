import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/dev.environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  readonly AUTHORIZATION: string = 'Authorization';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): any {

  }
  
  createUser(
    user: FormData
    //user: User,
    //picture: FormData
  ): any {
    // const headers = new HttpHeaders().set(
    //   this.AUTHORIZATION,
    //   `Bearer ${token}`
    // );
    return this.http.post<any>(
      `${environment.backendUrl}/php/users/userCreate.php`, 
      user
    );
  }

  updateUser(user: User): any {
    
  }

  enableUser(id: string) {
    
  }

  disableUser(id: string) {
    
  }

  clearData() {
    this.users = [];
  }
}
