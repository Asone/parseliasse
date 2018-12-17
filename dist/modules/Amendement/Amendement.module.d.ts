/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { AmendementsInterface } from '../../interfaces/Amendement.interface';
import { AbstractParseModule } from '../Abstract';
import { Observable, Subject } from 'rxjs';
import { ParamsInterface, AmendementRequestParams, InitParamsInterface } from '../../interfaces/Params.interface';
export declare class AmendementModule extends AbstractParseModule<AmendementsInterface> {
    amendement: Subject<AmendementsInterface>;
    params: InitParamsInterface<AmendementRequestParams>;
    constructor(params?: ParamsInterface<AmendementRequestParams>);
    /**
     * Fetches the json stream for `Amendement`
     *
     * @returns Promise<AmendementInterface>
     */
    fetch: (ids?: number | number[]) => Promise<AmendementsInterface>;
    /**
     * Updates the main object of sub-modules
     *
     * @param discussion The `AmendementsInterface` object retrieved from request
     *
     * @returns `AmendementsInterface` The discussion retrieved from request
     */
    update(amendement: AmendementsInterface): AmendementsInterface;
    /**
     * Returns the Amendement object as an Observable
     *
     * @returns Observable<Array<AmendementInterface>>
     */
    observe(): Observable<AmendementsInterface>;
    /**
     * @param requestParams The `GET` arguments to pass in URL request
     *
     * @returns The serialized argument for the request
     *
     * @todo : This method should be rewritten to implement automation of the string building process.
     * Additional notes :
     * - `AmendementRequestParams` has no index signature which makes it impossible to keycast with `myvar[key]`.
     * - If added `[key:string]: any` in interface, object will accept any additional field, which we don't want.
     * - Iteration on the interface keys with strict typing
     *
     */
    prepare(requestParams: AmendementRequestParams, ids?: Array<number>): string;
}
