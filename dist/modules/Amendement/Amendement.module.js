"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Abstract_1 = require("../Abstract");
const rxjs_1 = require("rxjs");
class AmendementModule extends Abstract_1.AbstractParseModule {
    constructor(params) {
        super();
        this.amendement = new rxjs_1.Subject();
        this.params = {
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
        /**
         * Fetches the json stream for `Amendement`
         *
         * @returns Promise<AmendementInterface>
         */
        this.fetch = (ids) => {
            let params = this.params.requestParams;
            if (ids)
                params.numAmdt = ids;
            if (!this.params.requestParams.numAmdt) {
                throw 'requestParams.numAmdt can\'t be null. number or array of numbers must be provided.';
            }
            else {
                const requestParams = this.prepare(params);
                return this.request(this.params.url + requestParams).then((amendement) => {
                    this.amendement.next(amendement);
                    return amendement;
                });
            }
        };
        if (params)
            Object.assign(this.params, params);
        if (params && params.cronjob)
            this.startjob(this.fetch, 10);
    }
    /**
     * Returns the Amendement object as an Observable
     *
     * @returns Observable<Array<AmendementInterface>>
     */
    observe() {
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
    prepare(requestParams, ids) {
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
exports.AmendementModule = AmendementModule;
//# sourceMappingURL=Amendement.module.js.map