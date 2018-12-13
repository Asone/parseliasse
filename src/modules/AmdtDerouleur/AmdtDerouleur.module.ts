/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { Subject, Observable } from 'rxjs';
import { AbstractParseModule } from '../Abstract';
import { AmdtDerouleurInterface, ParamsInterface, AmdtDerouleurRequestParams } from '../../interfaces';
import { InitParamsInterface, AmendementRequestParams } from '../../interfaces/Params.interface';

/**
 * This class fetches the amendment unwrapper (`Dérouleur d'amendement`) 
 */
export class AmdtDerouleurModule extends AbstractParseModule<Array<AmdtDerouleurInterface>>{
    
    amdtDerouleur: Subject<Array<AmdtDerouleurInterface>> = new Subject<Array<AmdtDerouleurInterface>>();
    params: InitParamsInterface<AmdtDerouleurRequestParams> = {
        cronjob: false,
        url: 'http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do',
        requestParams: {
            bibard: 1396,
            bibardSuffixe: null,
            legislature: 15,
            organeAbrv: 'AN'
        }
    };

    constructor(params?: ParamsInterface<AmdtDerouleurRequestParams>){
        super();
        if (params) this.applyParams(params);
        if (params && params.cronjob) this.startjob(this.fetch,60);
    }

    /**
     * Fetches the json stream for `AmdtDerouleur`
     * 
     * @returns Promise<Array<AmdtDerouleurInterface>>
     */
    fetch = (): Promise<Array<AmdtDerouleurInterface>> => {
        const requestParams: string = this.prepare(this.params.requestParams);
        return this.request(this.params.url + requestParams).then((amdtDerouleur: Array<AmdtDerouleurInterface>) => {
            this.amdtDerouleur.next(amdtDerouleur);
            return amdtDerouleur;
        });
    }

    /**
     * Returns the AmdDerouleur object as an Observable
     * 
     * @returns Observable<Array<AmdtDerouleurInterface>>
     */
    observe(): Observable<Array<AmdtDerouleurInterface>> {
        return this.amdtDerouleur.asObservable();
    }

    /**
     * @param requestParams The `GET` arguments to pass in URL request
     * 
     * @returns The serialized argument for the request
     * 
     * @todo : This method should be rewritten to implement automation of the string building process.
     * Additional notes : 
     * - `AmdtDerouleurRequestParams` has no index signature which makes it impossible to keycast with `myvar[key]`.
     * - If added `[key:string]: any` in interface, object will accept any additional field, which we don't want. 
     * - Iteration on the interface keys with strict typing 
     * 
     */
    prepare(requestParams: AmdtDerouleurRequestParams): string {
        let params: string = '?';
        params += 'legislature=' + requestParams.legislature;
        params += '&bibard=' + requestParams.bibard;
        params += '&bibardSuffixe=' + (requestParams.bibardSuffixe ? requestParams.bibardSuffixe : '');
        params += '&organeAbrv=' + requestParams.organeAbrv;
        params += requestParams.limit ? '&limit=' + requestParams.limit : '';
        params += requestParams.page ? '&page=' + requestParams.page : '';
        params += requestParams.startPosition && requestParams.endPosition ? '&position='  + requestParams.startPosition + '%F20' + requestParams.endPosition : '';
        params += requestParams.start ? '&start=' + requestParams.start : '';
        
        return params;
    }
}