/**
 * @author Nelson Herbin <nelson@herbin.info>
 * @copyright 2018. MIT Licence
 *
 */
/// <reference types="node" />
import { ParamsInterface, InitParamsInterface } from '../../interfaces/Params.interface';
/**
 * This is an abstract class that provides with the mutual
 * methods that are used in the modules for ParsEliasse.
 *
 * Derived Class will have to provide the data interface it will handle on requests.
 *
 */
export declare abstract class AbstractParseModule<T> {
    params: InitParamsInterface<any>;
    cron: NodeJS.Timeout | null;
    constructor(params?: ParamsInterface<any>);
    /**
     *
     * @param url the url to fetch
     *
     * @returns Promise<T> the request response
     */
    request(url: string): Promise<T>;
    /**
     * Sets a cron for playing a job at regular interval.
     * Useful for updating regularly the data.
     *
     * @param fn The function to play on each iteration
     * @param time Delay beetween each iteration
     */
    startjob(fn: () => Promise<T>, time: number): void;
    /**
     * Stops The cronjob.
     */
    stopjob(): void;
}
