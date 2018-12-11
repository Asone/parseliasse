/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { AmdtDerouleurModule, DiscussionModule, ProchainADiscuterModule, AmendementModule } from './modules';
import { ParamsInterface, AmendementRequestParams, DiscussionRequestParams, AmdtDerouleurRequestParams } from './interfaces/Params.interface';


export interface ModulesParams{
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
    amdtDerouleur: AmdtDerouleurModule = new AmdtDerouleurModule();
    discussion: DiscussionModule = new DiscussionModule();
    prochainADiscuter: ProchainADiscuterModule = new ProchainADiscuterModule();
    amendement: AmendementModule = new AmendementModule();

    // default parameters
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
        // overwrite default parameters
        if (params) Object.assign(this.params, params);

        // overwrite default parameters if needed in submodules
        if (this.params.amendement) this.amendement = new AmendementModule(this.params.amendement);
        if (this.params.amdtDerouleur) this.amdtDerouleur = new AmdtDerouleurModule(this.params.amdtDerouleur);
        if (this.params.discussion) this.discussion = new DiscussionModule(this.params.discussion);
        if (this.params.prochainADiscuter) this.prochainADiscuter = new ProchainADiscuterModule(this.params.prochainADiscuter);
    }
}