import { Stem } from '../../models/stem.model';
import { PollGebruiker } from '../../models/poll-gebruiker.model';
import { Vriend } from 'src/app/models/vriend.model';

export class Gebruiker {

    constructor(public gebruikerID: number, public email: string, public wachtwoord: string, public gebruikersnaam: string, public token: string, public stemmen?: Array<Stem>, public pollGebruikers?: Array<PollGebruiker>, public verzondenVerzoeken?: Array<Vriend>, public ontvangenVerzoeken?: Array<Vriend> ){}

}
