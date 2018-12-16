/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { AmdtDerouleurModule, DiscussionModule, ProchainADiscuterModule, AmendementModule } from './modules';
import { ParamsInterface, AmendementRequestParams, DiscussionRequestParams, AmdtDerouleurRequestParams, CommonEliasseInterface } from './interfaces/Params.interface';
import { ProchainADiscuterInterface } from './interfaces/ProchainADiscuter.interface';

export interface ModulesParams{
    autoconfig?: boolean;
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
    }

    constructor(params?: ModulesParams){
        // overwrite default parameters
        if (params) {
            if (params.prochainADiscuter) this.applyParams(this.params.prochainADiscuter,params.prochainADiscuter);
            if (params.amendement) this.applyParams(this.params.amendement,params.amendement);
            if (params.amdtDerouleur) this.applyParams(this.params.amdtDerouleur,params.amdtDerouleur);
            if (params.discussion) this.applyParams(this.params.discussion,params.discussion);
            this.boot(this.params);
        }
        
    }

    boot(params: ModulesParams): void {
        if(params.prochainADiscuter) this.prochainADiscuter = new ProchainADiscuterModule(this.params.prochainADiscuter);
        if(params.amendement) this.amendement = new AmendementModule(this.params.amendement);
        if(params.discussion) this.discussion = new DiscussionModule(this.params.discussion);
        if(params.amdtDerouleur) this.amdtDerouleur = new AmdtDerouleurModule(params.amdtDerouleur);
    }

    applyParams(obj: ParamsInterface<any>, config: ParamsInterface<any>): ParamsInterface<any> {
        if (config.cronjob) { obj.cronjob = config.cronjob; }
        if (config.url) { obj.url = config.url; }
        if (config.requestParams) { Object.assign(obj.requestParams,config.requestParams); }
        return obj;
    }

    autoconfig(): Promise<boolean> {
                return this.prochainADiscuter.fetch().then(this.autoApply.bind(this));
    }

    autoApply(response: any): any {
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
        
        this.discussion = new DiscussionModule(this.params.discussion);
        this.amendement = new AmendementModule(this.params.amendement);
        this.amdtDerouleur = new AmdtDerouleurModule(this.params.amdtDerouleur);
        return true;
    }
}