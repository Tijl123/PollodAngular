import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/poll.service';
import { Poll } from 'src/app/models/poll.model';
import { Antwoord } from 'src/app/models/antwoord.model';
import { PollGebruiker } from 'src/app/models/poll-gebruiker.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-maken',
  templateUrl: './poll-maken.component.html',
  styleUrls: ['./poll-maken.component.scss']
})
export class PollMakenComponent implements OnInit {

  submitted: boolean = false;
  poll: Poll = new Poll(0, '');
  responsEen: string;
  responsTwee: string;
  responsDrie: string;
  responsVier: string;

  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
  }

  //voegt poll en antwoorden toe en gaat naar de uitnodigenpagina
  onSubmit() {
    this.submitted = true;
    
    this._pollService.addPoll(this.poll).subscribe(
      result => {
        this.poll = result;
        this._pollService.addAntwoord(new Antwoord(0, this.responsEen, this.poll.pollID)).subscribe();
        this._pollService.addAntwoord(new Antwoord(0, this.responsTwee, this.poll.pollID)).subscribe();
        if (this.responsDrie != null) {
          this._pollService.addAntwoord(new Antwoord(0, this.responsDrie, this.poll.pollID)).subscribe();
        }
        if (this.responsVier != null) {
          this._pollService.addAntwoord(new Antwoord(0, this.responsVier, this.poll.pollID)).subscribe();
        }

        //voegt pollgebruiker van de gebruiker toe
        this._pollService.addPollGebruiker(new PollGebruiker(0, this.poll.pollID, Number(localStorage.getItem("gebruikerId")), true)).subscribe();
        //slaat nieuw aangemaakt poll op in local storage
        localStorage.setItem("uitnodigId", this.poll.pollID + "");
      }
    ); 

    this.router.navigate(['/uitnodigen']);

  }
}
