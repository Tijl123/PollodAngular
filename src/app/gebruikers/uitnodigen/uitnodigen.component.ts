import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from 'src/app/poll.service';
import { Gebruiker } from 'src/app/security/models/gebruiker.model';
import { Vriend } from 'src/app/models/vriend.model';
import { PollGebruiker } from 'src/app/models/poll-gebruiker.model';

@Component({
  selector: 'app-uitnodigen',
  templateUrl: './uitnodigen.component.html',
  styleUrls: ['./uitnodigen.component.scss']
})
export class UitnodigenComponent implements OnInit {

  vriendschap: Vriend[];
  vrienden: Gebruiker[] = new Array<Gebruiker>();
  messageVriend: string = "Je hebt nog geen vrienden. Nodig ze uit via het dashboard.";
  
  constructor(private _pollService: PollService, private router: Router) {

    //vrienden die gebruiker hebben toegevoegd worden opgehaald
    this._pollService.getVriendWhereOntvanger(Number(localStorage.getItem("gebruikerId"))).subscribe(
      result => {  
        this.vriendschap = result;
        this.vriendschap.forEach(verzoek => {    
          this._pollService.getGebruiker(verzoek.verzenderID).subscribe(
            tussenresult => {
              if(verzoek.geaccepteerd == true){
                this.vrienden.push(tussenresult)
              }
              if(this.vrienden.length != 0){
                this.messageVriend = "";
              }
            }
          );   
        });
      }
    );

    //vrienden die zijn toegevoegd door gebruiker worden opgehaald
    this._pollService.getVriendWhereVerzender(Number(localStorage.getItem("gebruikerId"))).subscribe(
      result => {  
        this.vriendschap = result;
        this.vriendschap.forEach(verzoek => {    
          this._pollService.getGebruiker(verzoek.ontvangerID).subscribe(
            tussenresult => {
              if(verzoek.geaccepteerd == true){
                this.vrienden.push(tussenresult)
              }
              if(this.vrienden.length != 0){
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

  //stuurt pollverzoek bij aanvinken en verwijdert polverzoek bij uitvinken checkbox van bepaalde gebruiker
  onChange(gebruikerId: number, isChecked: boolean) {
    if(isChecked) {
      this._pollService.addPollGebruiker(new PollGebruiker(0, Number(localStorage.getItem("uitnodigId")), gebruikerId, false)).subscribe();
    } else{
      this._pollService.getPollGebruikersFromGebruiker(gebruikerId).subscribe(
        result => {
          result.forEach(pollgebruiker => {
            if (pollgebruiker.pollID ==  Number(localStorage.getItem("uitnodigId"))) {
              this._pollService.deletePollGebruiker(pollgebruiker.pollGebruikerID).subscribe();
            }
          })
        }
      );
    }
  }
}
