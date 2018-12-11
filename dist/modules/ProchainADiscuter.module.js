"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Abstract_module_1 = require("./Abstract.module");
class ProchainADiscuterModule extends Abstract_module_1.AbstractParseModule {
    constructor(url, params) {
        super();
        this.url = 'http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do';
        this.params = {
            legislature: 15,
            organeAbrv: 'AN',
            bibard: 1396,
            bibardSuffixe: null
        };
        this.prochainADiscuter = new rxjs_1.Subject();
        /**
         * Fetches the json stream for `ProchainADiscuter`
         *
         * @returns Promise<ProchainADiscuterInterface>
         */
        this.fetch = () => {
            return this.request(this.url).then((prochainADiscuter) => {
                this.prochainADiscuter.next(prochainADiscuter);
                return prochainADiscuter;
            });
        };
        this.startjob(this.fetch, 60);
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
