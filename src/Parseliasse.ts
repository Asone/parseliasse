/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

import { AmdtDerouleurModule, DiscussionModule, ProchainADiscuterModule, AmendementModule } from './modules';
import { UrlsInterface } from './interfaces/Urls.interface';
import { ParamsInterface } from './interfaces/Params.interface';

/**
 * Main module
 */
export class Parseliasse{
    
    // Submodules
    amdtDerouleur?: AmdtDerouleurModule;
    discussion?: DiscussionModule;
    prochainADiscuter?: ProchainADiscuterModule;
    amendement?: AmendementModule;

    // List of Urls for modules
    urls: UrlsInterface = {
        amendement: 'amendement.do',
        amdtDerouleur: 'AmdtDerouleur.do',
        discussion: 'Discussion.do',
        prochainADiscuter: 'ProchainADiscuter',
        root: 'http://eliasse.assemblee-nationale.fr/eliasse/'   
    }

    constructor(urls?: UrlsInterface, params?: any){
        
        if (urls) Object.assign(this.urls,urls);

        if (this.urls.amendement) this.amendement = new AmendementModule({ url: this.urls.amendement});
        if (this.urls.amdtDerouleur) this.amdtDerouleur = new AmdtDerouleurModule({ url: this.urls.amdtDerouleur});
        if (this.urls.discussion) this.discussion = new DiscussionModule({ url: this.urls.discussion});
        if (this.urls.prochainADiscuter) this.prochainADiscuter = new ProchainADiscuterModule({ url: this.urls.prochainADiscuter });
    }

    init(){

    }
}