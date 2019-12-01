import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from 'src/app/poll.service';
import { Gebruiker } from 'src/app/security/models/gebruiker.model';
import { Vriend } from 'src/app/models/vriend.model';

@Component({
  selector: 'app-vrienden-toevoegen',
  templateUrl: './vrienden-toevoegen.component.html',
  styleUrls: ['./vrienden-toevoegen.component.scss']
})
export class VriendenToevoegenComponent implements OnInit {

  submitted : boolean = false;
  email: string;
  gebruiker: Gebruiker;
  vriend: Vriend;
  error: string;

  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
  }

  //stuurt vriendschapsverzoek naar gebruiker met bepaalde email en gaat naar dashboard
  onSubmit() {
      this.submitted = true;
      this._pollService.getGebruikerWhereEmail(this.email).subscribe(
        result => {
          this.gebruiker = result;
          this.vriend = new Vriend(0, Number(localStorage.getItem("gebruikerId")), this.gebruiker.gebruikerID, false);
          this._pollService.addVriend(this.vriend).subscribe();

          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.error = "Vertel je vriend om een account aan te maken met deze mail!";
        }
      );
  }

}
