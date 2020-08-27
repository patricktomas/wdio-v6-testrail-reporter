import { TestRailOptions, TestRailResult } from './testrail.interface';
/**
 * TestRail basic API wrapper
 */
export declare class TestRail {
    private options;
    private log;
    constructor(options: TestRailOptions);
    _get(endpoint: string): Promise<any>;
    _post(endpoint: string, body: object): Promise<any>;
    addResultsForCases(runID: any, results: TestRailResult[]): void;
    getLastTestRun(projectId: any, suiteId: any): Promise<any>;
}
