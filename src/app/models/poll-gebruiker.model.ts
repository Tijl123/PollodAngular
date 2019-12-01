import { Poll } from './poll.model';
import { Gebruiker } from '../security/models/gebruiker.model';

export class PollGebruiker {

    constructor(public pollGebruikerID: number, public pollID: number, public gebruikerID: number, public geaccepteerd: boolean, public poll?: Poll, public gebruiker?: Gebruiker){}

}
