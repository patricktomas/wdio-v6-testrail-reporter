import WDIOReporter from '@wdio/reporter';
import { TestRail } from './testrail';
declare class TestRailReporter extends WDIOReporter {
    private options;
    private log;
    private results;
    private passes;
    private fails;
    private pending;
    private out;
    private runId;
    client: TestRail;
    constructor(options: any);
    onSuiteStart(): Promise<void>;
    onTestPass(test: any): void;
    onTestFail(test: any): Promise<void>;
    onSuiteEnd(): Promise<void>;
    private validate;
}
export = TestRailReporter;
