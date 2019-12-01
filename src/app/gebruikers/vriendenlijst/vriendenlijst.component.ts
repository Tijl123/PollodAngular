import { Component, OnInit } from '@angular/core';
import { Gebruiker } from 'src/app/security/models/gebruiker.model';
import { PollService } from 'src/app/poll.service';
import { Vriend } from 'src/app/models/vriend.model';

@Component({
  selector: 'app-vriendenlijst',
  templateUrl: './vriendenlijst.component.html',
  styleUrls: ['./vriendenlijst.component.scss']
})
export class VriendenlijstComponent implements OnInit {

  vriendschap: Vriend[];
  vrienden: Gebruiker[] = new Array<Gebruiker>();
  messageVriend: string = "Je hebt nog geen vrienden. Nodig ze uit via het dashboard.";

  constructor(private _pollService: PollService) {

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

  //verwijdert het gekozen vriendschapsverzoek
  verwijderVriend(gebruikerId: number){
    if(confirm("Ben je zeker van je actie?")) {
      this.vriendschap.forEach(verzoek => {
        if(verzoek.verzenderID == gebruikerId){
          this._pollService.deleteVriend(verzoek.vriendID).subscribe();
        }
      });
    }
  }
}
