import { Component, OnInit } from '@angular/core';
import { PollGebruiker } from 'src/app/models/poll-gebruiker.model';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/poll.service';
import { Vriend } from 'src/app/models/vriend.model';
import { Gebruiker } from 'src/app/security/models/gebruiker.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pollGebruikers: PollGebruiker[];
  polls: Poll[] = new Array<Poll>();
  verzoeken: Poll[] = new Array<Poll>();
  messagePoll: string = "Geen polls beschikbaar.";
  messageUitnodiging: string = "Geen uitnodigingen.";
  messageVriend: string = "Geen vriendschapsverzoeken.";
  pollGebruiker: PollGebruiker;
  vriendschap: Vriend[];
  vriendverzoeken: Gebruiker[] = new Array<Gebruiker>();
  
  constructor(private _pollService: PollService, private router: Router) {

    //vraagt alle polls en pollverzoeken van de gebruiker op
    this._pollService.getPollGebruikersFromGebruiker(Number(localStorage.getItem("gebruikerId"))).subscribe(
      result => {  
        this.pollGebruikers = result;
        this.pollGebruikers.forEach(pollGebruiker => {      
          this._pollService.getPoll(pollGebruiker.pollID).subscribe(
            tussenresult => {
              if(pollGebruiker.geaccepteerd == true){
                //polls van de gebruiker
                this.polls.push(tussenresult);
              }
              else{
                //pollverzoeken van de gebruiker
                this.verzoeken.push(tussenresult);
              }
              if(this.polls.length != 0){
                this.messagePoll = "";
              }
              if(this.verzoeken.length != 0){
                this.messageUitnodiging = "";
              }
            }
          );  
        });
      }
    );

    //vraagt alle vriendschapsverzoeken van de gebruiker op
    this._pollService.getVriendWhereOntvanger(Number(localStorage.getItem("gebruikerId"))).subscribe(
      result => {  
        this.vriendschap = result;
        this.vriendschap.forEach(verzoek => {    
          this._pollService.getGebruiker(verzoek.verzenderID).subscribe(
            tussenresult => {
              if(verzoek.geaccepteerd == false){
                this.vriendverzoeken.push(tussenresult)
              }
              if(this.vriendverzoeken.length != 0){
                this.messageVriend = "";
              }
            }
          );   
        });
      }
    );
  }

  ngOnInit() {
  }

  //accepteert het gekozen pollverzoek
  accepteerPoll(pollID: number){
    this.pollGebruikers.forEach(pollGebruiker => {
      if(pollGebruiker.pollID == pollID){
        pollGebruiker.geaccepteerd = true;
        this._pollService.updatePollGebruiker(pollGebruiker.pollGebruikerID, pollGebruiker).subscribe();
      }
      localStorage.setItem("pollId", pollID + "");
      //vernieuwd pagina na 1 seconde
      setTimeout(() => {
        if (window.location.href == "http://localhost:4200/dashboard") {
          this.router.navigate(['/dashboard2']);
        }
        else{
          this.router.navigate(['/dashboard']);
        }
      }, 1000);
    });
  }

  //verwijdert het gekozen pollverzoek
  weigerPoll(pollID: number){
    if(confirm("Ben je zeker van je actie?")) {
      this.pollGebruikers.forEach(pollGebruiker => {
        if(pollGebruiker.pollID == pollID){
          this._pollService.deletePollGebruiker(pollGebruiker.pollGebruikerID).subscribe();
        }
      });
    }
    //vernieuwd pagina na 1 seconde
    setTimeout(() => {
      if (window.location.href == "http://localhost:4200/dashboard") {
        this.router.navigate(['/dashboard2']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    }, 1000); 
  }

  //accepteert het gekozen vriendschapsverzoek
  accepteerVriend(gebruikerId: number){
    this.vriendschap.forEach(verzoek => {
      if(verzoek.verzenderID == gebruikerId){
        verzoek.geaccepteerd = true;
        this._pollService.updateVriend(verzoek.vriendID, verzoek).subscribe();
      }
    });
    //vernieuwd pagina na 1 seconde
    setTimeout(() => {
      if (window.location.href == "http://localhost:4200/dashboard") {
        this.router.navigate(['/dashboard2']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    }, 1000); 
  }

  //verwijdert het gekozen vriendschapsverzoek
  weigerVriend(gebruikerId: number){
    if(confirm("Ben je zeker van je actie?")) {
      this.vriendschap.forEach(verzoek => {
        if(verzoek.verzenderID == gebruikerId){
          this._pollService.deleteVriend(verzoek.vriendID).subscribe();
        }
      });
    }
    //vernieuwd pagina na 1 seconde
    setTimeout(() => {
      if (window.location.href == "http://localhost:4200/dashboard") {
        this.router.navigate(['/dashboard2']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    }, 1000);  
  }

  //slaagt de id van de gekozen poll op in local storage en gaat naar de stempagina
  stemmen(pollID: number){
    localStorage.setItem("pollId", pollID + "");
    this.router.navigate(['/stemmen']);
  }

  //gaat naar de resultaatpagina van de gekozen poll
  resultaatTonen(pollID: number){
    localStorage.setItem("pollId", pollID + "");
    this.router.navigate(['/resultaat']);
  }

}
