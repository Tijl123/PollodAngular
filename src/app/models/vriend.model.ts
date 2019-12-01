import { Gebruiker } from '../security/models/gebruiker.model';

export class Vriend {
    constructor(public vriendID: number, public verzenderID: number, public ontvangerID: number, public geaccepteerd: boolean, public verzender?: Gebruiker, public ontvanger?: Gebruiker ){}
}
