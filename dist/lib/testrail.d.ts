import { TestRailOptions, TestRailResult } from "./testrail.interface";
/**
 * TestRail basic API wrapper
 */
export declare class TestRail {
    private options;
    private base;
    private log;
    constructor(options: TestRailOptions);
    private _post;
    private _get;
    /**
     * Fetchs test cases from projet/suite based on filtering criteria (optional)
     * @param {{[p: string]: number[]}} filters
     * @param {Function} callback
     */
    fetchCases(filters?: {
        [key: string]: number[];
    }, callback?: Function): void;
    /**
     * Publishes results of execution of an automated test run
     * @param {string} name
     * @param {string} description
     * @param {TestRailResult[]} results
     * @param {Function} callback
     */
    publish(name: string, description: string, results: TestRailResult[], callback?: Function): void;
}
