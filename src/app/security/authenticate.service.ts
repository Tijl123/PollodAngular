import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GebruikerLogin } from './models/gebruiker-login.model';
import { Gebruiker } from './models/gebruiker.model';
@Injectable({
providedIn: 'root'
})
export class AuthenticateService {

  isLoggedin = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient) { }

  authenticate(gebruikerLogin: GebruikerLogin): Observable<Gebruiker> {
    return this._httpClient.post<Gebruiker>("https://localhost:44302/api/gebruiker/authenticate", gebruikerLogin);
  }

  isLoggedIn() {
    if(localStorage.getItem("token")) {
      return true;
    } 
    else {
      return false;
    }
  }

}
