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
 * Retrieves the `ProchainADiscuter` stream
 */
var ProchainADiscuterModule = /** @class */ (function (_super) {
    __extends(ProchainADiscuterModule, _super);
    /**
     *
     * @param params The request parameters.
     * @see `ParamsInterface` definition
     */
    function ProchainADiscuterModule(params) {
        var _this = _super.call(this) || this;
        _this.prochainADiscuter = new rxjs_1.Subject();
        _this.params = {
            url: 'http://eliasse.assemblee-nationale.fr/eliasse/prochainADiscuter.do',
            cronjob: false,
            requestParams: null
        };
        /**
         * Fetches the json stream for `ProchainADiscuter`
         *
         * @returns Promise<ProchainADiscuterInterface>
         */
        _this.fetch = function () {
            return _this.request(_this.params.url).then(function (prochainADiscuter) {
                _this.prochainADiscuter.next(prochainADiscuter);
                return prochainADiscuter;
            });
        };
        if (params)
            Object.assign(_this.params, params);
        if (params && params.cronjob)
            _this.startjob(_this.fetch, 10);
        return _this;
    }
    /**
     * Returns the ProchainADiscuter object as an Observable
     *
     * @returns Observable<ProchainADiscuterInterface>
     */
    ProchainADiscuterModule.prototype.observe = function () {
        return this.prochainADiscuter.asObservable();
    };
    return ProchainADiscuterModule;
}(Abstract_1.AbstractParseModule));
exports.ProchainADiscuterModule = ProchainADiscuterModule;
//# sourceMappingURL=ProchainADiscuter.module.js.map