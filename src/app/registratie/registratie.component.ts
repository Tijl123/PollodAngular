import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registratie',
  templateUrl: './registratie.component.html',
  styleUrls: ['./registratie.component.scss']
})
export class RegistratieComponent implements OnInit {

  submitted : boolean = false;
  error: string;

  registreerForm = this.fb.group({
    gebruikersnaam: ['', Validators.required],
    email: ['', Validators.required],
    wachtwoord: ['', [Validators.required]],
    bevestigWachtwoord: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private _pollService: PollService, private router: Router) {}

  ngOnInit() {
  }

  //voegt gebruiker toe aan database en gaat naar loginpagina
  onSubmit() {
    //kijkt of wachtwoorden overeenkomen
    if(this.registreerForm.value.wachtwoord == this.registreerForm.value.bevestigWachtwoord){
      this.submitted = true;
      this._pollService.addGebruiker(this.registreerForm.value).subscribe();
      this.router.navigate(['/login']);
    }
    else{
      this.error = "Wachtwoorden zijn niet hetzelfde!";
    }
  }

}
