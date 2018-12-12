/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { AmendementsInterface } from '../../interfaces/Amendement.interface';
import { AbstractParseModule } from '../Abstract';
import { Observable, Subject, of } from 'rxjs';
import { ParamsInterface, AmendementRequestParams, InitParamsInterface } from '../../interfaces/Params.interface';
export class AmendementModule extends AbstractParseModule<AmendementsInterface>{
    amendement: Subject<AmendementsInterface> = new Subject<AmendementsInterface>();
    params: InitParamsInterface<AmendementRequestParams> = {
        cronjob: false,
        url: 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do',
        requestParams: {
            bibard: 1396,
            bibardSuffixe: null,
            legislature: 15,
            organeAbrv: 'AN',
            numAmdt: null
        }
    };
    
    constructor(params?: ParamsInterface<AmendementRequestParams>){
        super();
        if (params) Object.assign(this.params, params);
        if(params && params.cronjob) this.startjob(this.fetch,10);
    }

    /**
     * Fetches the json stream for `Amendement`
     * 
     * @returns Promise<AmendementInterface>
     */
    fetch = (ids?: number | Array<number>): Promise<AmendementsInterface> => {
        let params: AmendementRequestParams = this.params.requestParams;
        if (ids) params.numAmdt = ids;
        if (!this.params.requestParams.numAmdt) {
            throw 'requestParams.numAmdt can\'t be null. number or array of numbers must be provided.';
        } else {
            const requestParams: string = this.prepare(params);
            return this.request(this.params.url + requestParams).then((amendement: AmendementsInterface): AmendementsInterface => {
                this.amendement.next(amendement);
                return amendement;
            });
        }
    }

    /**
     * Returns the Amendement object as an Observable
     * 
     * @returns Observable<Array<AmendementInterface>>
     */
    observe(): Observable<AmendementsInterface> {
        return this.amendement.asObservable();
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
    prepare(requestParams: AmendementRequestParams, ids?: Array<number>): string {
        let params: string = '?';
        params += 'legislature=' + requestParams.legislature;
        params += '&bibard=' + requestParams.bibard; 
        params += '&bibardSuffixe=' + (requestParams.bibardSuffixe ? requestParams.bibardSuffixe : '');
        params += '&organeAbrv=' + requestParams.organeAbrv;
        if(requestParams.numAmdt) {
                if(typeof requestParams.numAmdt === 'object'){
                    requestParams.numAmdt.forEach((numAmdt: number): void => {
                        params += '&numAmdt=' + numAmdt;
                    });   
                } else if (typeof requestParams.numAmdt === 'number') {
                    params += '&numAmdt=' + requestParams.numAmdt;
                }
            }
        params += requestParams.limit ? '&limit=' + requestParams.limit : '';
        params += requestParams.page ? '&page=' + requestParams.page : '';
        params += requestParams.start ? '&start=' + requestParams.start : '';
        
        return params;
    }

}