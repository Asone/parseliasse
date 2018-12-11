"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Abstract_1 = require("../Abstract");
/**
 * Retrieves the `ProchainADiscuter` stream
 */
class ProchainADiscuterModule extends Abstract_1.AbstractParseModule {
    /**
     *
     * @param params The request parameters.
     * @see `ParamsInterface` definition
     */
    constructor(params) {
        super();
        this.prochainADiscuter = new rxjs_1.Subject();
        this.params = {
            url: 'http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do',
            cronjob: false,
            requestParams: null
        };
        /**
         * Fetches the json stream for `ProchainADiscuter`
         *
         * @returns Promise<ProchainADiscuterInterface>
         */
        this.fetch = () => {
            return this.request(this.params.url).then((prochainADiscuter) => {
                this.prochainADiscuter.next(prochainADiscuter);
                return prochainADiscuter;
            });
        };
        if (params)
            Object.assign(this.params, params);
        if (params && params.cronjob)
            this.startjob(this.fetch, 10);
    }
    /**
     * Returns the ProchainADiscuter object as an Observable
     *
     * @returns Observable<ProchainADiscuterInterface>
     */
    observe() {
        return this.prochainADiscuter.asObservable();
    }
}
exports.ProchainADiscuterModule = ProchainADiscuterModule;
