/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { Observable, Subject } from "rxjs";
import { ProchainADiscuterInterface } from '../../interfaces/ProchainADiscuter.interface';
import { AbstractParseModule } from '../Abstract';
import { InitParamsInterface, ParamsInterface } from '../../interfaces/Params.interface';


/**
 * Retrieves the `ProchainADiscuter` stream
 */
export class ProchainADiscuterModule extends AbstractParseModule<ProchainADiscuterInterface>{

    prochainADiscuter: Subject<ProchainADiscuterInterface> = new Subject<ProchainADiscuterInterface>();
    params: InitParamsInterface<null> = {
        url: 'http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do',
        cronjob: false,
        requestParams: null
    };

    /**
     * 
     * @param params The request parameters. 
     * @see `ParamsInterface` definition
     */
    constructor(params?: ParamsInterface<void>){
        super();
        if (params) this.applyParams(params);
        if (params && params.cronjob) this.startjob(this.fetch,10);
    }
    
    /**
     * Fetches the json stream for `ProchainADiscuter`
     * 
     * @returns Promise<ProchainADiscuterInterface>
     */
    fetch = (): Promise<ProchainADiscuterInterface> => {
        return this.request(this.params.url).then(this.updateObject.bind(this));
    }

    updateObject(prochainADiscuter: ProchainADiscuterInterface){
            this.prochainADiscuter.next(prochainADiscuter);
            return prochainADiscuter;
        }

    /**
     * Returns the ProchainADiscuter object as an Observable
     * 
     * @returns Observable<ProchainADiscuterInterface>
     */
    observe(): Observable<ProchainADiscuterInterface> {
        return this.prochainADiscuter.asObservable();
    }
    
}