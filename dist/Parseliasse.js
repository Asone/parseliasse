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
        // Submodules
        this.amdtDerouleur = new modules_1.AmdtDerouleurModule();
        this.discussion = new modules_1.DiscussionModule();
        this.prochainADiscuter = new modules_1.ProchainADiscuterModule();
        this.amendement = new modules_1.AmendementModule();
        // default parameters
        this.params = {
            autoconfig: false,
            amendement: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do'
            },
            discussion: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do'
            },
            prochainADiscuter: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do',
            },
            amdtDerouleur: {
                url: 'http://eliasse.assemblee-nationale.fr/eliasse/AmdtDerouleur.do'
            }
        };
        // overwrite default parameters
        if (params) {
            if (params.prochainADiscuter)
                this.applyParams(this.params.prochainADiscuter, params.prochainADiscuter);
            if (params.amendement)
                this.applyParams(this.params.amendement, params.amendement);
            if (params.amdtDerouleur)
                this.applyParams(this.params.amdtDerouleur, params.amdtDerouleur);
            if (params.discussion)
                this.applyParams(this.params.discussion, params.discussion);
            this.boot(this.params);
        }
    }
    boot(params) {
        if (params.prochainADiscuter)
            this.prochainADiscuter = new modules_1.ProchainADiscuterModule(this.params.prochainADiscuter);
        if (params.amendement)
            this.amendement = new modules_1.AmendementModule(this.params.amendement);
        if (params.discussion)
            this.discussion = new modules_1.DiscussionModule(this.params.discussion);
        if (params.amdtDerouleur)
            this.amdtDerouleur = new modules_1.AmdtDerouleurModule(params.amdtDerouleur);
    }
    applyParams(obj, config) {
        if (config.cronjob) {
            obj.cronjob = config.cronjob;
        }
        if (config.url) {
            obj.url = config.url;
        }
        if (config.requestParams) {
            Object.assign(obj.requestParams, config.requestParams);
        }
        return obj;
    }
    autoconfig() {
        return this.prochainADiscuter.fetch().then(this.autoApply.bind(this));
    }
    autoApply(response) {
        let autoparams;
        // creates a new common set of parameters
        autoparams = {
            bibard: response.prochainADiscuter.bibard,
            bibardSuffixe: response.prochainADiscuter.bibardSuffixe,
            legislature: response.prochainADiscuter.legislature,
            organeAbrv: response.prochainADiscuter.organeAbrv
        };
        // overwrite request parameters with fetched parameters
        this.params.amdtDerouleur.requestParams = autoparams;
        this.params.amendement.requestParams = autoparams;
        this.params.discussion.requestParams = autoparams;
        this.discussion = new modules_1.DiscussionModule(this.params.discussion);
        this.amendement = new modules_1.AmendementModule(this.params.amendement);
        this.amdtDerouleur = new modules_1.AmdtDerouleurModule(this.params.amdtDerouleur);
        return true;
    }
}
exports.Parseliasse = Parseliasse;
//# sourceMappingURL=Parseliasse.js.map