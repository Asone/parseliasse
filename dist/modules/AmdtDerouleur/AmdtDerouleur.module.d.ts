/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { Subject, Observable } from 'rxjs';
import { AbstractParseModule } from '../Abstract';
import { AmdtDerouleurInterface, ParamsInterface, AmdtDerouleurRequestParams } from '../../interfaces';
import { InitParamsInterface } from '../../interfaces/Params.interface';
/**
 * This class fetches the amendment unwrapper (`Dérouleur d'amendement`)
 */
export declare class AmdtDerouleurModule extends AbstractParseModule<Array<AmdtDerouleurInterface>> {
    amdtDerouleur: Subject<Array<AmdtDerouleurInterface>>;
    params: InitParamsInterface<AmdtDerouleurRequestParams>;
    constructor(params?: ParamsInterface<AmdtDerouleurRequestParams>);
    /**
     * Fetches the json stream for `AmdtDerouleur`
     *
     * @returns Promise<Array<AmdtDerouleurInterface>>
     */
    fetch: () => Promise<AmdtDerouleurInterface[]>;
    /**
     * Updates the main object of sub-module
     *
     * @param discussion The `AmdtDerouleurInterface` array object retrieved from request
     *
     * @returns `AmdtDerouleurInterface` The amdtDerouleur array object retrieved from request
     */
    update(amdtDerouleur: Array<AmdtDerouleurInterface>): Array<AmdtDerouleurInterface>;
    /**
     * Returns the AmdDerouleur object as an Observable
     *
     * @returns Observable<Array<AmdtDerouleurInterface>>
     */
    observe(): Observable<Array<AmdtDerouleurInterface>>;
    /**
     * @param requestParams The `GET` arguments to pass in URL request
     *
     * @returns The serialized argument for the request
     *
     * @todo : This method should be rewritten to implement automation of the string building process.
     * Additional notes :
     * - `AmdtDerouleurRequestParams` has no index signature which makes it impossible to keycast with `myvar[key]`.
     * - If added `[key:string]: any` in interface, object will accept any additional field, which we don't want.
     * - Iteration on the interface keys with strict typing
     *
     */
    prepare(requestParams: AmdtDerouleurRequestParams): string;
}
