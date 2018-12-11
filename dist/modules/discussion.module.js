"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Abstract_module_1 = require("./Abstract.module");
/**
 * Processes a discussion
 */
class DiscussionModule extends Abstract_module_1.AbstractParseModule {
    constructor(url) {
        super();
        this.discussion = new rxjs_1.Subject();
        this.params = {
            legislature: 15,
            organeAbrv: 'AN',
            bibard: 1396,
            bibardSuffixe: null
        };
        this.url = 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do';
        /**
         * Fetches the json stream for `Discussion`
         *
         * @returns Promise<Array<DiscussionInterface>>
         */
        this.fetch = () => {
            return this.request(this.url).then((discussion) => {
                this.discussion.next(discussion);
                return discussion;
            });
        };
        this.startjob(this.fetch, 60);
    }
    /**
     * Returns the Discussion object as an Observable
     *
     * @returns Observable<Array<DiscussionInterface>>
     */
    observe() {
        return this.discussion.asObservable();
    }
}
exports.DiscussionModule = DiscussionModule;
