
/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 * 
 */

const fetch = require("node-fetch");
import { ParamsInterface, InitParamsInterface } from '../../interfaces/Params.interface';

/**
 * This is an abstract class that provides with the mutual
 * methods that are used in the modules for ParsEliasse.
 * 
 * Derived Class will have to provide the data interface it will handle on requests. 
 * 
 */
export abstract class AbstractParseModule<T>{
    params: InitParamsInterface<any> = {
      cronjob: false,
      url: '',
      requestParams: {}
    }

    cron: number | null = null;
    
    constructor(params?: ParamsInterface<any>){
        if (params && params.url) this.params.url = params.url;
    }

    /**
     * 
     * @param url the url to fetch
     * 
     * @returns Promise<T> the request response
     */
    request(url: string): Promise<T>{
      return fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res: Response): any => { return res.json(); });
    }

    /**
     * Sets a cron for playing a job at regular interval.
     * Useful for updating regularly the data.
     * 
     * @param fn The function to play on each iteration
     * @param time Delay beetween each iteration
     */
    startjob(fn: () => Promise<T>, time: number): void {   
        this.cron = window.setInterval(fn,time*1000);
    }

    /**
     * Stops The cronjob.
     */
    stopjob(): void {
        if (this.cron) window.clearInterval(this.cron);
    }

}