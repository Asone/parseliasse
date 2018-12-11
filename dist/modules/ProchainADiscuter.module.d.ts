/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { Observable, Subject } from "rxjs";
import { ProchainADiscuterInterface } from '../interfaces/ProchainADiscuter.interface';
import { AbstractParseModule } from './Abstract.module';
export declare class ProchainADiscuterModule extends AbstractParseModule<ProchainADiscuterInterface> {
    url: string;
    params: any;
    prochainADiscuter: Subject<ProchainADiscuterInterface>;
    constructor(url?: string, params?: {
        [key: string]: string;
    });
    /**
     * Fetches the json stream for `ProchainADiscuter`
     *
     * @returns Promise<ProchainADiscuterInterface>
     */
    fetch: () => Promise<ProchainADiscuterInterface>;
    /**
     * Returns the ProchainADiscuter object as an Observable
     *
     * @returns Observable<ProchainADiscuterInterface>
     */
    observe(): Observable<ProchainADiscuterInterface>;
}
