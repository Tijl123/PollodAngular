import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { GebruikerLogin } from '../models/gebruiker-login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  gebruikerLogin: GebruikerLogin = new GebruikerLogin('', '');

  constructor(private _authenticateService : AuthenticateService, private router: Router) { }

  ngOnInit() {
  }

  //slaat het jwt token en de gebruikerId op in local storage en gaat naar dashboard
  onSubmit() {
    this.submitted = true;
      
    this._authenticateService.authenticate(this.gebruikerLogin).subscribe(result => {
      this._authenticateService.isLoggedin.next(result.token ? true : false);
      localStorage.setItem("token",result.token);
      localStorage.setItem("gebruikerId",result.gebruikerID + "");
      this.router.navigate(['/dashboard']);
    });
  }
  
}
