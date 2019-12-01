import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/poll.service';
import { Poll } from 'src/app/models/poll.model';
import { Antwoord } from 'src/app/models/antwoord.model';

@Component({
  selector: 'app-resultaat',
  templateUrl: './resultaat.component.html',
  styleUrls: ['./resultaat.component.scss']
})
export class ResultaatComponent implements OnInit {

  poll: Poll;
  antwoorden: Antwoord[];

  constructor(private _pollService: PollService) {

    //vraagt gekozen poll op
    this._pollService.getPoll(Number(localStorage.getItem("pollId"))).subscribe(
      result => {  
        this.poll = result
      }
    );

    //vraagt antwoorden van gekozen poll op en het aantal stemmen per antwoord
    this._pollService.getAntwoordenWherePollID(Number(localStorage.getItem("pollId"))).subscribe(
      result => {  
        this.antwoorden = result;
        this.antwoorden.forEach(antwoord => {     
          this._pollService.getStemmenWhereAntwoordID(antwoord.antwoordID).subscribe(
            result => {
              antwoord.stemmen = result;  
            }
          ); 
        });
      }
    ); 

  } 

  ngOnInit() {
  }

}
