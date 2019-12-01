import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../models/poll.model';
import { Gebruiker } from '../security/models/gebruiker.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pollCount: number;
  gebruikerCount: number;
  
  constructor(private _pollService: PollService) {

    //vraagt het aantal polls op
    this._pollService.getPollCount().subscribe(
      result => {
        this.pollCount = result;
      }
    );

    //vraagt het aantal gebruikers op
    this._pollService.getGebruikerCount().subscribe(
      result => {
        this.gebruikerCount = result;
      }
    );

  }

  ngOnInit() {
  }

}
