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
var Abstract_1 = require("../Abstract");
var rxjs_1 = require("rxjs");
var AmendementModule = /** @class */ (function (_super) {
    __extends(AmendementModule, _super);
    function AmendementModule(params) {
        var _this = _super.call(this) || this;
        _this.amendement = new rxjs_1.Subject();
        _this.params = {
            cronjob: false,
            url: 'http://eliasse.assemblee-nationale.fr/eliasse/amendement.do',
            requestParams: {
                bibard: 1396,
                bibardSuffixe: null,
                legislature: 15,
                organeAbrv: 'AN',
                numAmdt: []
            }
        };
        /**
         * Fetches the json stream for `Amendement`
         *
         * @returns Promise<AmendementInterface>
         */
        _this.fetch = function (ids) {
            var params = _this.params.requestParams;
            if (ids)
                params.numAmdt = ids;
            if (_this.params.requestParams.numAmdt) {
                var requestParams = _this.prepare(params);
                return _this.request(_this.params.url + requestParams).then(function (amendement) {
                    _this.amendement.next(amendement);
                    return amendement;
                });
            }
            else {
                throw 'requestParams.numAmdt can\'t be null. number or array of numbers must be provided.';
            }
        };
        if (params)
            Object.assign(_this.params, params);
        if (params && params.cronjob)
            _this.startjob(_this.fetch, 10);
        return _this;
    }
    /**
     * Returns the Amendement object as an Observable
     *
     * @returns Observable<Array<AmendementInterface>>
     */
    AmendementModule.prototype.observe = function () {
        return this.amendement.asObservable();
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
    AmendementModule.prototype.prepare = function (requestParams, ids) {
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
    return AmendementModule;
}(Abstract_1.AbstractParseModule));
exports.AmendementModule = AmendementModule;
//# sourceMappingURL=Amendement.module.js.map