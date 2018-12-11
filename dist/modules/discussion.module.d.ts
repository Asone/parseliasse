/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
import { DiscussionInterface } from '../interfaces/Discussion.interface';
import { Subject, Observable } from 'rxjs';
import { AbstractParseModule } from './Abstract.module';
/**
 * Processes a discussion
 */
export declare class DiscussionModule extends AbstractParseModule<Array<DiscussionInterface>> {
    discussion: Subject<Array<DiscussionInterface>>;
    params: any;
    url: string;
    constructor(url?: string);
    /**
     * Fetches the json stream for `Discussion`
     *
     * @returns Promise<Array<DiscussionInterface>>
     */
    fetch: () => Promise<DiscussionInterface[]>;
    /**
     * Returns the Discussion object as an Observable
     *
     * @returns Observable<Array<DiscussionInterface>>
     */
    observe(): Observable<Array<DiscussionInterface>>;
}
