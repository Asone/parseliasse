/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */

// main module
export { Parseliasse } from './Parseliasse';

// submodules
export { AmdtDerouleurModule } from './modules/AmdtDerouleur/AmdtDerouleur.module';
export { AmendementModule } from './modules/Amendement/Amendement.module';
export { AbstractParseModule } from './modules/Abstract/Abstract.module';
export { DiscussionModule } from './modules/Discussion/Discussion.module';
export { ProchainADiscuterModule } from './modules/ProchainADiscuter/ProchainADiscuter.module';

// interfaces
export { AmdtDerouleurInterface } from './interfaces/AmdtDerouleur.interface';
export { AmendementInterface } from './interfaces/Amendement.interface';
export { DiscussionInterface } from './interfaces/Discussion.interface';
export { ProchainADiscuterInterface } from './interfaces/ProchainADiscuter.interface';
export { 
    AmdtDerouleurRequestParams,
    AmendementRequestParams,
    DiscussionRequestParams,
    InitParamsInterface,
    ParamsInterface
} from './interfaces/Params.interface';
