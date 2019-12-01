import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/poll.service';
import { Poll } from 'src/app/models/poll.model';
import { Antwoord } from 'src/app/models/antwoord.model';
import { Stem } from 'src/app/models/stem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stemmen',
  templateUrl: './stemmen.component.html',
  styleUrls: ['./stemmen.component.scss']
})
export class StemmenComponent implements OnInit {
  
  poll: Poll;
  antwoorden: Antwoord[];
  antwoordId: number;
  stem: Stem;
  oudestemmen: Stem[];

  constructor(private _pollService: PollService, private router: Router) {

    //vraagt gekozen poll op
    this._pollService.getPoll(Number(localStorage.getItem("pollId"))).subscribe(
      result => {  
        this.poll = result
      }
    );

    //vraagt antwoorden van gekozen poll op
    this._pollService.getAntwoordenWherePollID(Number(localStorage.getItem("pollId"))).subscribe(
      result => {  
        this.antwoorden = result;
      }
    ); 

  } 

  ngOnInit() {
  }

  //voegt stem toe aan bepaald antwoord en gaat naar resultaat na 1 seconde 
  stemmen() {
    this.stem = new Stem(0, this.antwoordId, Number(localStorage.getItem("gebruikerId")));
    this.antwoorden.forEach(antwoord => {
      this._pollService.getStemmenWhereAntwoordID(antwoord.antwoordID).subscribe(
        result => {
          this.oudestemmen = result;
          this.oudestemmen.forEach(oudestem => {
            if (oudestem.gebruikerID == Number(localStorage.getItem("gebruikerId"))) {
              this._pollService.deleteStem(oudestem.stemID).subscribe();
            }
          })
        }
      )
    });   
    this._pollService.addStem(this.stem).subscribe();
    setTimeout(() => {
      this.router.navigate(['/resultaat']);
    }, 1000);  
  }

}
