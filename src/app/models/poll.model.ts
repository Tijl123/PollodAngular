import { Antwoord } from './antwoord.model';
import { PollGebruiker } from './poll-gebruiker.model';

export class Poll {

    constructor(public pollID: number, public vraag: string, public antwoorden?: Array<Antwoord>, public pollGebruikers?: Array<PollGebruiker>){}

}
