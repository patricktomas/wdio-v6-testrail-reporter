import WDIOReporter from '@wdio/reporter';
declare class TestRailReporter extends WDIOReporter {
    private options;
    private log;
    private results;
    private passes;
    private fails;
    private pending;
    private out;
    constructor(options: any);
    onTestPass(test: any): void;
    onTestFail(test: any): void;
    onRunnerEnd(): void;
    private validate;
}
export = TestRailReporter;
