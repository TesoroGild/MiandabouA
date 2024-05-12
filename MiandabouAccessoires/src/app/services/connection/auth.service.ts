import { UserCredentials } from './../../interfaces/user-credentials.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/dev.environment';
import { BehaviorSubject } from 'rxjs';
import { UserToDisplay } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  keyRole: string = 'role';
  keyToken: string = 'token';

  //userToDisplay: UserToDisplay = { } as UserToDisplay;

  userIsLoggedIn = new BehaviorSubject<boolean>(false);
  userIsAdmin = new BehaviorSubject<boolean>(false);
  userToDisplay = new BehaviorSubject<UserToDisplay>({} as UserToDisplay);

  userConnected: UserToDisplay = { } as UserToDisplay;

  constructor(
    private http : HttpClient
  ) { 
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('role');
    this.userIsLoggedIn.next(!!token);
    this.userIsAdmin.next(!!admin);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  logIn(userToConnect: FormData) {
    //<LoginResponse>
    return this.http.post<any>(
      `${environment.backendUrl}/php/users/userLogin.php`, 
      userToConnect
    );
    //const loginSucced = loginResponse.loginSucced !== null && loginResponse.loginSucced !== '';

    // if (loginResponse.loginSucced !== null 
    //   && loginResponse.loginSucced !== '') {
    //   this.setSession(loginResponse);
    //   this.userToDisplay = loginResponse;
    // };
    // console.log(loginResponse);
    // console.log(this.userToDisplay);
    // console.log(loginSucced);
    // return this.userToDisplay;
  }

  async logOut() {
    const qparams = { 'id': 0 };
    const logoutResponse = await this.http.post<any>(
      `${environment.backendUrl}/php/userDeco.php`, 
      { params: qparams }
    ).toPromise();
    const logoutSucced = logoutResponse.msg !== null && logoutResponse.msg !== '';

    if (logoutSucced) {
      this.unsetSession();
      //this.userToDisplay = {} as UserToDisplay;
    }
    console.log(logoutResponse);
    console.log(logoutSucced);
    return logoutSucced;
  }

  isAdmin() {
    return localStorage.getItem(this.keyRole) === "admin";
  }

  setSession(authToken: any) {
      localStorage.setItem(this.keyToken, authToken.token);
      localStorage.setItem(this.keyRole, authToken.role);
      this.userIsLoggedIn.next(true);

      // envoyer le token JWT dans l'en-tête d'autorisation des requêtes HTTP
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(this.keyToken)
        })
      };
    }

    unsetSession() {
      localStorage.removeItem(this.keyToken);
      localStorage.removeItem(this.keyRole);
      localStorage.clear();
      this.userIsLoggedIn.next(false);
      this.userIsAdmin.next(false);
    }

  getToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }

  setUserToDisplay(user: UserToDisplay) {
    //this.userToDisplay = user;
    this.userToDisplay.next(user);
    this.setSession(user.token);
    return this.userToDisplay.asObservable();
    //console.log(this.userToDisplay);
  }

  getUserToDisplay() {
    return this.userToDisplay.asObservable();
  }

}
