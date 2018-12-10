/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { AmdtDerouleurModule, DiscussionModule, ProchainADiscuterModule, AmendementModule } from './modules';
import { UrlsInterface } from './interfaces/Urls.interface';
import { ParamsInterface, AmendementRequestParams, DiscussionRequestParams, AmdtDerouleurRequestParams } from './interfaces/Params.interface';


interface ModulesParams{
    amendement?: ParamsInterface<AmendementRequestParams>;
    discussion?: ParamsInterface<DiscussionRequestParams>;
    amdtDerouleur?: ParamsInterface<AmdtDerouleurRequestParams>;  
    prochainADiscuter?: ParamsInterface<void>;     
}


/**
 * Main module
 */
export class Parseliasse{
    
    // Submodules
    amdtDerouleur?: AmdtDerouleurModule;
    discussion?: DiscussionModule;
    prochainADiscuter?: ProchainADiscuterModule;
    amendement?: AmendementModule;

    params: ModulesParams = {
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
    }

    constructor(params?: ModulesParams){

        if (params) Object.assign(this.params, params);

        if (this.params.amendement) this.amendement = new AmendementModule(this.params.amdtDerouleur);
        if (this.params.amdtDerouleur) this.amdtDerouleur = new AmdtDerouleurModule(this.params.amdtDerouleur);
        if (this.params.discussion) this.discussion = new DiscussionModule(this.params.discussion);
        if (this.params.prochainADiscuter) this.prochainADiscuter = new ProchainADiscuterModule(this.params.prochainADiscuter);
    }
}