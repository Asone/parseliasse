"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var Abstract_1 = require("../Abstract");
/**
 * Processes a discussion
 */
var DiscussionModule = /** @class */ (function (_super) {
    __extends(DiscussionModule, _super);
    function DiscussionModule(params) {
        var _this = _super.call(this) || this;
        _this.discussion = new rxjs_1.Subject();
        _this.params = {
            cronjob: false,
            url: 'http://eliasse.assemblee-nationale.fr/eliasse/discussion.do',
            requestParams: {
                bibard: 1396,
                bibardSuffixe: null,
                legislature: 15,
                organeAbrv: 'AN',
                numAmdt: []
            }
        };
        /**
         * Fetches the json stream for `Discussion`
         *
         * @returns Promise<Array<DiscussionInterface>>
         */
        _this.fetch = function () {
            var requestParams = _this.prepare(_this.params.requestParams);
            return _this.request(_this.params.url + requestParams).then(function (discussion) {
                _this.discussion.next(discussion);
                return discussion;
            });
        };
        if (params)
            Object.assign(_this.params, params);
        if (params && params.cronjob)
            _this.startjob(_this.fetch, 600);
        return _this;
    }
    /**
     * Returns the `Discussion` object as an `Observable`
     *
     * @returns Observable<Array<DiscussionInterface>>
     */
    DiscussionModule.prototype.observe = function () {
        return this.discussion.asObservable();
    };
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
    DiscussionModule.prototype.prepare = function (requestParams) {
        var params = '?';
        params += 'legislature=' + requestParams.legislature;
        params += '&bibard=' + requestParams.bibard;
        params += '&bibardSuffixe=' + (requestParams.bibardSuffixe ? requestParams.bibardSuffixe : '');
        params += '&organeAbrv=' + requestParams.organeAbrv;
        if (requestParams.numAmdt) {
            if (typeof requestParams.numAmdt === 'object') {
                requestParams.numAmdt.forEach(function (numAmdt) {
                    params += '&numAmdt=' + numAmdt;
                });
            }
            else if (typeof requestParams.numAmdt === 'number') {
                params += '&numAmdt=' + requestParams.numAmdt;
            }
        }
        params += requestParams.limit ? '&limit=' + requestParams.limit : '';
        params += requestParams.page ? '&page=' + requestParams.page : '';
        params += requestParams.start ? '&start=' + requestParams.start : '';
        return params;
    };
    return DiscussionModule;
}(Abstract_1.AbstractParseModule));
exports.DiscussionModule = DiscussionModule;
//# sourceMappingURL=Discussion.module.js.map