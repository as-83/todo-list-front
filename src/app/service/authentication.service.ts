import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/User';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password): any {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<User>('http://localhost:8080/todo-list/validateLogin', { headers }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username );
          return userData;
        }
      )

    );
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem('username');
  }
}
