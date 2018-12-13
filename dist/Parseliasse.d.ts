/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { AmdtDerouleurModule, DiscussionModule, ProchainADiscuterModule, AmendementModule } from './modules';
import { ParamsInterface, AmendementRequestParams, DiscussionRequestParams, AmdtDerouleurRequestParams } from './interfaces/Params.interface';
export interface ModulesParams {
    autoconfig?: boolean;
    amendement?: ParamsInterface<AmendementRequestParams>;
    discussion?: ParamsInterface<DiscussionRequestParams>;
    amdtDerouleur?: ParamsInterface<AmdtDerouleurRequestParams>;
    prochainADiscuter?: ParamsInterface<void>;
}
/**
 * Main module
 */
export declare class Parseliasse {
    amdtDerouleur: AmdtDerouleurModule;
    discussion: DiscussionModule;
    prochainADiscuter: ProchainADiscuterModule;
    amendement: AmendementModule;
    params: ModulesParams;
    constructor(params?: ModulesParams);
    autoconfig(): void;
}
