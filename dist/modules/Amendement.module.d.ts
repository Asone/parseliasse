/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { AmendementInterface } from '../interfaces/Amendement.interface';
import { AbstractParseModule } from './Abstract.module';
import { Observable, Subject } from 'rxjs';
export declare class AmendementModule extends AbstractParseModule<Array<AmendementInterface>> {
    amendement: Subject<Array<AmendementInterface>>;
    params: any;
    url: string;
    constructor(url?: string);
    /**
     * Fetches the json stream for `Amendement`
     *
     * @returns Promise<AmendementInterface>
     */
    fetch: () => Promise<AmendementInterface[]>;
    /**
     * Returns the Amendement object as an Observable
     *
     * @returns Observable<Array<AmendementInterface>>
     */
    observe(): Observable<Array<AmendementInterface>>;
}
