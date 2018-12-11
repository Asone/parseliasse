"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Abstract_module_1 = require("./Abstract.module");
/**
 * This class fetches the amendment unwrapper (`Dérouleur d'amendement`)
 *
 * @type
 */
class AmdtDerouleurModule extends Abstract_module_1.AbstractParseModule {
    constructor(url) {
        super();
        this.url = 'http://eliasse.assemblee-nationale.fr/eliasse/AmdtDerouleur.do';
        this.amdtDerouleur = new rxjs_1.Subject();
        this.params = {
            legislature: 15,
            organeAbrv: 'AN',
            bibard: 1396,
            bibardSuffixe: null
        };
        /**
         * Fetches the json stream for `AmdtDerouleur`
         *
         * @returns Promise<Array<AmdtDerouleurInterface>>
         */
        this.fetch = () => {
            return this.request(this.url).then((amdtDerouleur) => {
                this.amdtDerouleur.next(amdtDerouleur);
                return amdtDerouleur;
            });
        };
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
}
exports.AmdtDerouleurModule = AmdtDerouleurModule;
