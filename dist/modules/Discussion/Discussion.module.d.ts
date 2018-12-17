/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { DiscussionInterface } from '../../interfaces/Discussion.interface';
import { Subject, Observable } from 'rxjs';
import { AbstractParseModule } from '../Abstract';
import { ParamsInterface, DiscussionRequestParams, InitParamsInterface } from '../../interfaces/Params.interface';
/**
 * Processes a discussion
 */
export declare class DiscussionModule extends AbstractParseModule<DiscussionInterface> {
    discussion: Subject<DiscussionInterface>;
    params: InitParamsInterface<DiscussionRequestParams>;
    constructor(params?: ParamsInterface<DiscussionRequestParams>);
    /**
     * Fetches the json stream for `Discussion`
     *
     * @returns Promise<Array<DiscussionInterface>>
     */
    fetch: () => Promise<DiscussionInterface>;
    /**
     * Updates the main object of sub-module
     *
     * @param discussion The `DiscussionInterface` object retrieved from request
     *
     * @returns `DiscussionInterface` The discussion retrieved from request
     */
    update(discussion: DiscussionInterface): DiscussionInterface;
    /**
     * Returns the `Discussion` object as an `Observable`
     *
     * @returns Observable<Array<DiscussionInterface>>
     */
    observe(): Observable<DiscussionInterface>;
    /**
     * @param requestParams The `GET` arguments to pass in URL request
     *
     * @returns The serialized argument for the request
     *
     * @todo : This method should be rewritten to implement automation of the string building process.
     * Additional notes :
     * - `DiscussionRequestParams` has no index signature which makes it impossible to keycast with `myvar[key]`.
     * - If added `[key:string]: any` in interface, object will accept any additional field, which we don't want.
     * - Iteration on the interface keys with strict typing
     *
     */
    prepare(requestParams: DiscussionRequestParams): string;
}
