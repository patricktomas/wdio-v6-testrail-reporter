"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger_1 = require("@wdio/logger");
const reporter_1 = require("@wdio/reporter");
const testrail_1 = require("./testrail");
const testrail_interface_1 = require("./testrail.interface");
const shared_1 = require("./shared");
class TestRailReporter extends reporter_1.default {
    constructor(options) {
        super(options);
        this.client = new testrail_1.TestRail(this.options);
        options = Object.assign(options, { stdout: false });
        this.log = logger_1.default('wdio-v6-testrail-reporter');
        this.validate(options, 'testRailUrl');
        this.validate(options, 'username');
        this.validate(options, 'password');
        this.validate(options, 'projectId');
        this.validate(options, 'suiteId');
        // compute base url
        this.options = options;
        this.results = [];
        this.passes = 0;
        this.fails = 0;
        this.pending = 0;
        this.out = [];
    }
    onSuiteStart() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastRun = yield this.client.getLastTestRun(this.options.projectId, this.options.suiteId);
            this.runId = lastRun.runs[0].id;
        });
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
        this.client.addResultsForCases(this.runId, this.results);
    }
    onTestFail(test) {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.client.addResultsForCases(this.runId, this.results);
        });
    }
    onSuiteEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.results.length == 0) {
                this.log.error('No testcases were matched. Ensure that your tests are declared correctly and matches format Cxxx. For example C420');
            }
        });
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