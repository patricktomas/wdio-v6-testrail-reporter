"use strict";
const logger_1 = require("@wdio/logger");
const reporter_1 = require("@wdio/reporter");
const testrail_1 = require("./testrail");
const testrail_interface_1 = require("./testrail.interface");
const shared_1 = require("./shared");
class TestRailReporter extends reporter_1.default {
    constructor(options) {
        super(options);
        options = Object.assign(options, { stdout: false });
        this.log = logger_1.default('wdio-v6-testrail-reporter');
        this.validate(options, 'testRailUrl');
        this.validate(options, 'username');
        this.validate(options, 'password');
        this.validate(options, 'projectId');
        this.validate(options, 'suiteId');
        this.validate(options, 'runName');
        // compute base url
        this.options = options;
        this.results = [];
        this.passes = 0;
        this.fails = 0;
        this.pending = 0;
        this.out = [];
    }
    onTestPass(test) {
        this.passes++;
        this.out.push(test.title + ': pass');
        let caseIds = shared_1.titleToCaseIds(test.title);
        if (caseIds.length > 0) {
            if (test.speed === 'fast') {
                let results = caseIds.map((caseId) => {
                    return {
                        case_id: caseId,
                        status_id: testrail_interface_1.Status.Passed,
                        comment: test.title,
                    };
                });
                this.results.push(...results);
            }
            else {
                let results = caseIds.map((caseId) => {
                    return {
                        case_id: caseId,
                        status_id: testrail_interface_1.Status.Passed,
                        comment: `${test.title} (${test.duration}ms)`,
                    };
                });
                this.results.push(...results);
            }
        }
    }
    onTestFail(test) {
        this.fails++;
        this.out.push(test.title + ': fail');
        let caseIds = shared_1.titleToCaseIds(test.title);
        if (caseIds.length > 0) {
            let results = caseIds.map((caseId) => {
                return {
                    case_id: caseId,
                    status_id: testrail_interface_1.Status.Failed,
                    comment: `${test.error.message}`,
                };
            });
            this.results.push(...results);
        }
    }
    onRunnerEnd() {
        if (this.results.length == 0) {
            this.log.error('No testcases were matched. Ensure that your tests are declared correctly and matches format Cxxx. For example C420');
        }
        let executionDateTime = new Date().toISOString();
        let total = this.passes + this.fails + this.pending;
        let name = this.options.runName;
        let description = `Automated test run executed on ${executionDateTime}
Execution summary:
Passes: ${this.passes}
Fails: ${this.fails}
Pending: ${this.pending}
Total: ${total}
Execution details:
`;
        new testrail_1.TestRail(this.options).publish(name, description, this.results);
    }
    validate(options, name) {
        if (options == null) {
            throw new Error('Missing options. Please look into documentation');
        }
        if (options[name] == null) {
            throw new Error(`Missing ${name} option value. Please look into documentation`);
        }
    }
}
module.exports = TestRailReporter;
//# sourceMappingURL=reporter.js.map