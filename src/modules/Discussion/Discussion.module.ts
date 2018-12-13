/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { DiscussionInterface } from '../../interfaces/Discussion.interface';
import { Subject, Observable } from 'rxjs';
import { AbstractParseModule } from '../Abstract';
import { ParamsInterface, DiscussionRequestParams, InitParamsInterface } from '../../interfaces/Params.interface';
import { isRegExp } from 'util';

interface Params{
    cronjob?: boolean;
    url?: string;
    requestsParams?: {
        legislature?: number;
        organeAbrv?: string;
        bibard?: number;
        bibardSuffixe?: string | null;
        numAmdt?: number | Array<number>;
        start?: number;
        limit?: number;
        page?: number;
    }
}

/**
 * Processes a discussion
 */
export class DiscussionModule extends AbstractParseModule<DiscussionInterface>{
    discussion: Subject<DiscussionInterface> = new Subject<DiscussionInterface>();
    params: InitParamsInterface<DiscussionRequestParams> = {
        cronjob: false,
        url: 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do',
        requestParams: {
            bibard: 1396,
            bibardSuffixe: null,
            legislature: 15,
            organeAbrv: 'AN',
            numAmdt: []
        }
    };
    
    constructor(params?: ParamsInterface<DiscussionRequestParams>){
        super();
        if (params) this.applyParams(params);
        if (params && params.cronjob) this.startjob(this.fetch,600);
    }

    /**
     * Fetches the json stream for `Discussion`
     * 
     * @returns Promise<Array<DiscussionInterface>>
     */
    fetch = (): Promise<DiscussionInterface>  => {
        const requestParams: string = this.prepare(this.params.requestParams);
        return this.request(this.params.url + requestParams).then((discussion: DiscussionInterface): DiscussionInterface => {
            this.discussion.next(discussion);
            return discussion;
        });
    }

    /**
     * Returns the `Discussion` object as an `Observable`
     * 
     * @returns Observable<Array<DiscussionInterface>>
     */
    observe(): Observable<DiscussionInterface> {
        return this.discussion.asObservable();
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
    prepare(requestParams: DiscussionRequestParams): string {   
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