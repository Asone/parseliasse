"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Abstract_1 = require("../Abstract");
/**
 * This class fetches the amendment unwrapper (`Dérouleur d'amendement`)
 */
class AmdtDerouleurModule extends Abstract_1.AbstractParseModule {
    constructor(params) {
        super();
        this.amdtDerouleur = new rxjs_1.Subject();
        this.params = {
            cronjob: false,
            url: 'http://eliasse.assemblee-nationale.fr/eliasse/amdtDerouleur.do',
            requestParams: {
                bibard: 1396,
                bibardSuffixe: null,
                legislature: 15,
                organeAbrv: 'AN'
            }
        };
        /**
         * Fetches the json stream for `AmdtDerouleur`
         *
         * @returns Promise<Array<AmdtDerouleurInterface>>
         */
        this.fetch = () => {
            const requestParams = this.prepare(this.params.requestParams);
            return this.request(this.params.url + requestParams).then((amdtDerouleur) => {
                this.amdtDerouleur.next(amdtDerouleur);
                return amdtDerouleur;
            });
        };
        if (params)
            Object.assign(this.params, params);
        if (params && params.cronjob)
            this.startjob(this.fetch, 60);
    }
    /**
     * Returns the AmdDerouleur object as an Observable
     *
     * @returns Observable<Array<AmdtDerouleurInterface>>
     */
    observe() {
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
    prepare(requestParams) {
        let params = '?';
        params += 'legislature=' + requestParams.legislature;
        params += '&bibard=' + requestParams.bibard;
        params += '&bibardSuffixe=' + (requestParams.bibardSuffixe ? requestParams.bibardSuffixe : '');
        params += '&organeAbrv=' + requestParams.organeAbrv;
        params += requestParams.limit ? '&limit=' + requestParams.limit : '';
        params += requestParams.page ? '&page=' + requestParams.page : '';
        params += requestParams.startPosition && requestParams.endPosition ? '&position=' + requestParams.startPosition + '%F20' + requestParams.endPosition : '';
        params += requestParams.start ? '&start=' + requestParams.start : '';
        return params;
    }
}
exports.AmdtDerouleurModule = AmdtDerouleurModule;
//# sourceMappingURL=AmdtDerouleur.module.js.map