import { Poll } from './poll.model';
import { Stem } from './stem.model';

export class Antwoord {

    constructor(public antwoordID: number, public respons: string, public pollID: number, public poll?: Poll, public stemmen?: Array<Stem>){}

}
