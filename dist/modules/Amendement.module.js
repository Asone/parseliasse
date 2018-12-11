"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Abstract_module_1 = require("./Abstract.module");
const rxjs_1 = require("rxjs");
class AmendementModule extends Abstract_module_1.AbstractParseModule {
    constructor(url) {
        super();
        this.amendement = new rxjs_1.Subject();
        this.params = {
            legislature: 15,
            organeAbrv: 'AN',
            bibard: 1396,
            bibardSuffixe: null
        };
        this.url = 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do';
        /**
         * Fetches the json stream for `Amendement`
         *
         * @returns Promise<AmendementInterface>
         */
        this.fetch = () => {
            return this.request(this.url).then((amendement) => {
                this.amendement.next(amendement);
                return amendement;
            });
        };
        this.startjob(this.fetch, 60);
    }
    /**
     * Returns the Amendement object as an Observable
     *
     * @returns Observable<Array<AmendementInterface>>
     */
    observe() {
        return this.amendement.asObservable();
    }
}
exports.AmendementModule = AmendementModule;
