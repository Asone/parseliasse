/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { Observable, Subject } from "rxjs";
import { ProchainADiscuterInterface } from '../../interfaces/ProchainADiscuter.interface';
import { AbstractParseModule } from '../Abstract';
import { InitParamsInterface, ParamsInterface } from '../../interfaces/Params.interface';
/**
 * Retrieves the `ProchainADiscuter` stream
 */
export declare class ProchainADiscuterModule extends AbstractParseModule<ProchainADiscuterInterface> {
    prochainADiscuter: Subject<ProchainADiscuterInterface>;
    params: InitParamsInterface<null>;
    /**
     *
     * @param params The request parameters.
     * @see `ParamsInterface` definition
     */
    constructor(params?: ParamsInterface<void>);
    /**
     * Fetches the json stream for `ProchainADiscuter`
     *
     * @returns Promise<ProchainADiscuterInterface>
     */
    fetch: () => Promise<ProchainADiscuterInterface>;
    update(prochainADiscuter: ProchainADiscuterInterface): ProchainADiscuterInterface;
    /**
     * Returns the ProchainADiscuter object as an Observable
     *
     * @returns Observable<ProchainADiscuterInterface>
     */
    observe(): Observable<ProchainADiscuterInterface>;
}
