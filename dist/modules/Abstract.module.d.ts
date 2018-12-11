/**
 * @author Nelson Herbin <nelson@herbin.info>
 */
/// <reference types="node" />
/**
 * This is an abstract class that provides with the mutual
 * methods that are used in the modules for ParsEliasse.
 *
 * Derived Class will have to provide the data interface it will handle on requests.
 *
 */
export declare abstract class AbstractParseModule<T> {
    url?: string;
    cron: NodeJS.Timeout | null;
    constructor(url?: string | undefined);
    /**
     * Ajax request on URL provided.
     *
     * @returns Promise<T>, given T the type provided by the derived
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
