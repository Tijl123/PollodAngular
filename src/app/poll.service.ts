import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from './models/poll.model';
import { Gebruiker } from './security/models/gebruiker.model';
import { PollGebruiker } from './models/poll-gebruiker.model';
import { Vriend } from './models/vriend.model';
import { Antwoord } from './models/antwoord.model';
import { Stem } from './models/stem.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  //Poll

  //geeft het aantal polls
  getPollCount(): Observable<number> {
    return this.http.get<number>("https://localhost:44302/api/poll/count");
  }

  //geeft de poll met een bepaalde pollId
  getPoll(pollID: number): Observable<Poll> {
    return this.http.get<Poll>("https://localhost:44302/api/poll/" + pollID);
  }

  //voegt een poll toe
  addPoll(poll: Poll) {
    return this.http.post<Poll>("https://localhost:44302/api/poll", poll);
  }

  //Gebruiker

  //geeft het aantal gebruikers
  getGebruikerCount(): Observable<number> {
    return this.http.get<number>("https://localhost:44302/api/gebruiker/count");
  }

  //geeft de gebruiker met een bepaalde gebruikerId
  getGebruiker(gebruikerID: number): Observable<Gebruiker> {
    return this.http.get<Gebruiker>("https://localhost:44302/api/gebruiker/" + gebruikerID);
  }

  //geeft de gebruiker met een bepaalde email
  getGebruikerWhereEmail(email: string): Observable<Gebruiker> {
    return this.http.get<Gebruiker>("https://localhost:44302/api/gebruiker/email/" + email);
  }

  //voegt een gebruiker toe
  addGebruiker(gebruiker: Gebruiker) {
    return this.http.post<Gebruiker>("https://localhost:44302/api/gebruiker", gebruiker);
  }

  //PollGebruiker

  //geeft de pollgebruikers met een bepaalde gebruikerId
  getPollGebruikersFromGebruiker(gebruikerID: number): Observable<PollGebruiker[]> {
    return this.http.get<PollGebruiker[]>("https://localhost:44302/api/pollgebruiker/gebruiker/" + gebruikerID);
  }

  //voegt een pollgebruiker toe
  addPollGebruiker(pollGebruiker: PollGebruiker) {
    return this.http.post<PollGebruiker>("https://localhost:44302/api/pollgebruiker", pollGebruiker);
  }

  //update de meegegeven pollgebruiker
  updatePollGebruiker(pollGebruikerID: number, pollGebruiker: PollGebruiker) {
    return this.http.put<PollGebruiker>("https://localhost:44302/api/pollgebruiker/" + pollGebruikerID, pollGebruiker);
  }

  //verwijdert de pollgebruiker met een bepaalde pollgebruikerId
  deletePollGebruiker(pollGebruikerID: number) {
    return this.http.delete<PollGebruiker>("https://localhost:44302/api/pollgebruiker/" + pollGebruikerID);
  }

  //Vriend

  //geeft de vriendschapsverzoeken met een bepaalde ontvangerID 
  getVriendWhereOntvanger(ontvangerID: number): Observable<Vriend[]> {
    return this.http.get<Vriend[]>("https://localhost:44302/api/vriend/ontvanger/" + ontvangerID);
  }

  //geeft de vriendschapsverzoeken met een bepaalde verzenderID 
  getVriendWhereVerzender(verzenderID: number): Observable<Vriend[]> {
    return this.http.get<Vriend[]>("https://localhost:44302/api/vriend/verzender/" + verzenderID);
  }

  //voegt een vriend toe
  addVriend(vriend: Vriend) {
    return this.http.post<Vriend>("https://localhost:44302/api/vriend", vriend);
  }

  //update de meegegeven vriend
  updateVriend(vriendID: number, vriend: Vriend) {
    return this.http.put<Vriend>("https://localhost:44302/api/vriend/" + vriendID, vriend);
  }

  //verwijdert de vriend met een bepaalde vriendId
  deleteVriend(vriendID: number) {
    return this.http.delete<Vriend>("https://localhost:44302/api/vriend/" + vriendID);
  }

  //Antwoord

  //geeft de antwoorden met een bepaalde pollId
  getAntwoordenWherePollID(pollID: number): Observable<Antwoord[]> {
    return this.http.get<Antwoord[]>("https://localhost:44302/api/antwoord/poll/" + pollID);
  }

  //voegt een antwoord toe
  addAntwoord(antwoord: Antwoord) {
    return this.http.post<Antwoord>("https://localhost:44302/api/antwoord", antwoord);
  }

  //Stem

  //geeft de stemmen met een bepaalde antwoordId
  getStemmenWhereAntwoordID(antwoordID: number): Observable<Stem[]> {
    return this.http.get<Stem[]>("https://localhost:44302/api/stem/antwoord/" + antwoordID);
  }

  //voegt een stem toe
  addStem(stem: Stem) {
    return this.http.post<Stem>("https://localhost:44302/api/stem", stem);
  }

  //verwijdert de stem met een bepaalde stemId
  deleteStem(stemID: number) {
    return this.http.delete<Stem>("https://localhost:44302/api/stem/" + stemID);
  }

}
