"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("./modules");
/**
 * Main module
 */
class Parseliasse {
    constructor(params) {
        // overwrite default parameters
        // Submodules
        this.amdtDerouleur = new modules_1.AmdtDerouleurModule();
        this.discussion = new modules_1.DiscussionModule();
        this.prochainADiscuter = new modules_1.ProchainADiscuterModule();
        this.amendement = new modules_1.AmendementModule();
        // default parameters
        this.params = {
            autoconfig: false,
            amendement: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do',
                cronjob: false
            },
            discussion: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do',
                cronjob: false
            },
            prochainADiscuter: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do',
                cronjob: false
            },
            amdtDerouleur: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/AmdtDerouleur.do',
                cronjob: false
            }
        };
        if (this.params.autoconfig) { // launches autoconfiguration for submodules
            this.prochainADiscuter.fetch().then((response) => {
                // creates a new common set of parameters
                const autoparams = {
                    bibard: response.prochainADiscuter.bibard,
                    bibardSuffixe: response.prochainADiscuter.bibardSuffixe,
                    legislature: response.prochainADiscuter.legislature,
                    organeAbrv: response.prochainADiscuter.organeAbrv
                };
                // overwrite request parameters with fetched parameters
                Object.assign(this.params.amdtDerouleur.requestParams, autoparams);
                Object.assign(this.params.amendement.requestParams, autoparams);
                Object.assign(this.params.discussion, autoparams);
            });
        }
        if (params)
            Object.assign(this.params, params);
        // overwrite default parameters if needed in submodules
        if (this.params.amendement)
            this.amendement = new modules_1.AmendementModule(this.params.amendement);
        if (this.params.amdtDerouleur)
            this.amdtDerouleur = new modules_1.AmdtDerouleurModule(this.params.amdtDerouleur);
        if (this.params.discussion)
            this.discussion = new modules_1.DiscussionModule(this.params.discussion);
        if (this.params.prochainADiscuter)
            this.prochainADiscuter = new modules_1.ProchainADiscuterModule(this.params.prochainADiscuter);
    }
    autoconfig() { }
}
exports.Parseliasse = Parseliasse;
//# sourceMappingURL=Parseliasse.js.map