import { Antwoord } from './antwoord.model';
import { Gebruiker } from '../security/models/gebruiker.model';

export class Stem {

    constructor(public stemID: number, public antwoordID: number, public gebruikerID: number, public antwoord?: Antwoord, public gebruiker?: Gebruiker){}

}
