"use strict";
/**
 * @author Nelson Herbin <nelson@herbin.info>
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is an abstract class that provides with the mutual
 * methods that are used in the modules for ParsEliasse.
 *
 * Derived Class will have to provide the data interface it will handle on requests.
 *
 */
class AbstractParseModule {
    constructor(url) {
        this.cron = null;
        if (url)
            this.url = url;
    }
    /**
     * Ajax request on URL provided.
     *
     * @returns Promise<T>, given T the type provided by the derived
     */
    request(url) {
        return new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                }
                else {
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function () {
                reject(new Error('XMLHttpRequest Error: ' + this.statusText));
            };
            request.open('GET', url);
            request.send();
        });
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
