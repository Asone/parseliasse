"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("node-fetch");
/**
 * This is an abstract class that provides with the mutual
 * methods that are used in the modules for ParsEliasse.
 *
 * Derived Class will have to provide the data interface it will handle on requests.
 *
 */
class AbstractParseModule {
    constructor(params) {
        this.params = {
            cronjob: false,
            url: '',
            requestParams: {}
        };
        this.cron = null;
        if (params && params.url)
            this.params.url = params.url;
    }
    /**
     *
     * @param url the url to fetch
     *
     * @returns Promise<T> the request response
     */
    request(url) {
        return fetch(url, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => { return res.json(); });
    }
    /**
     * Sets a cron for playing a job at regular interval.
     * Useful for updating regularly the data.
     *
     * @param fn The function to play on each iteration
     * @param time Delay beetween each iteration
     */
    startjob(fn, time) {
        this.cron = setInterval(fn, time * 1000);
    }
    /**
     * Stops The cronjob.
     */
    stopjob() {
        if (this.cron)
            clearInterval(this.cron);
    }
}
exports.AbstractParseModule = AbstractParseModule;
