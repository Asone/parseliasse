/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { AmdtDerouleurInterface } from '../interfaces/AmdtDerouleur.interface';
import { Subject, Observable } from 'rxjs';
import { AbstractParseModule } from './Abstract.module';
/**
 * This class fetches the amendment unwrapper (`Dérouleur d'amendement`)
 *
 * @type
 */
export declare class AmdtDerouleurModule extends AbstractParseModule<Array<AmdtDerouleurInterface>> {
    url: string;
    amdtDerouleur: Subject<Array<AmdtDerouleurInterface>>;
    params: any;
    constructor(url?: string);
    /**
     * Fetches the json stream for `AmdtDerouleur`
     *
     * @returns Promise<Array<AmdtDerouleurInterface>>
     */
    fetch: () => Promise<AmdtDerouleurInterface[]>;
    /**
     * Returns the AmdDerouleur object as an Observable
     *
     * @returns Observable<Array<AmdtDerouleurInterface>>
     */
    observe(): Observable<Array<AmdtDerouleurInterface>>;
}
