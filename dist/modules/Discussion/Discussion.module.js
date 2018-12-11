"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Abstract_1 = require("../Abstract");
/**
 * Processes a discussion
 */
class DiscussionModule extends Abstract_1.AbstractParseModule {
    constructor(params) {
        super();
        this.discussion = new rxjs_1.Subject();
        this.params = {
            cronjob: false,
            url: 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do',
            requestParams: {
                bibard: 1396,
                bibardSuffixe: null,
                legislature: 15,
                organeAbrv: 'AN',
                numAmdt: []
            }
        };
        /**
         * Fetches the json stream for `Discussion`
         *
         * @returns Promise<Array<DiscussionInterface>>
         */
        this.fetch = () => {
            const requestParams = this.prepare(this.params.requestParams);
            return this.request(this.params.url + requestParams).then((discussion) => {
                this.discussion.next(discussion);
                return discussion;
            });
        };
        if (params)
            Object.assign(this.params, params);
        if (params && params.cronjob)
            this.startjob(this.fetch, 600);
    }
    /**
     * Returns the `Discussion` object as an `Observable`
     *
     * @returns Observable<Array<DiscussionInterface>>
     */
    observe() {
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
    prepare(requestParams) {
        let params = '?';
        params += 'legislature=' + requestParams.legislature;
        params += '&bibard=' + requestParams.bibard;
        params += '&bibardSuffixe=' + (requestParams.bibardSuffixe ? requestParams.bibardSuffixe : '');
        params += '&organeAbrv=' + requestParams.organeAbrv;
        if (requestParams.numAmdt) {
            if (typeof requestParams.numAmdt === 'object') {
                requestParams.numAmdt.forEach((numAmdt) => {
                    params += '&numAmdt=' + numAmdt;
                });
            }
            else if (typeof requestParams.numAmdt === 'number') {
                params += '&numAmdt=' + requestParams.numAmdt;
            }
        }
        params += requestParams.limit ? '&limit=' + requestParams.limit : '';
        params += requestParams.page ? '&page=' + requestParams.page : '';
        params += requestParams.start ? '&start=' + requestParams.start : '';
        return params;
    }
}
exports.DiscussionModule = DiscussionModule;
