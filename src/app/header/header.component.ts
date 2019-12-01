import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../security/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: boolean;

  constructor(private _authenticateService : AuthenticateService, private router: Router) {

    this.login = Boolean(JSON.parse(localStorage.getItem("login")));
    
    //bij inloggen wordt login op true gezet in local storage
    this._authenticateService.isLoggedin.subscribe(e=> {
      if (e == true) {
        localStorage.setItem("login", "true");
        this.login = Boolean(JSON.parse(localStorage.getItem("login")));
        console.log(this.login);
      }
    })
  }

  ngOnInit() {
  }

  //verwijdert jwt token en gebruikerId en zet login op false in local storage en gaat naar home
  uitloggen(){
    localStorage.removeItem("token");
    localStorage.removeItem("gebruikerId");
    localStorage.setItem("login", "false");
    this.login = Boolean(JSON.parse(localStorage.getItem("login")));
    console.log(this.login);
    this.router.navigate(['/']);
  }

}
