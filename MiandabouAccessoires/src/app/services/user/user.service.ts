import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  createUsers(
    user: User,
    //token: string
  ): any {
    // const headers = new HttpHeaders().set(
    //   this.AUTHORIZATION,
    //   `Bearer ${token}`
    // );
    return this.http.post<any>(
      `${environment.backendUrl}/users/userCreate.php`, 
      user
    );
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
