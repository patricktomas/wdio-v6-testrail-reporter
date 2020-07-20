"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("unirest");
const logger_1 = require("@wdio/logger");
/**
 * TestRail basic API wrapper
 */
class TestRail {
    constructor(options) {
        this.options = options;
        // compute base url
        this.base = `https://${options.testRailUrl}/index.php`;
        this.log = logger_1.default('wdio-testrail-reporter');
    }
    _post(api, body, callback, error) {
        var req = request('POST', this.base)
            .query(`/api/v2/${api}`)
            .headers({
            'content-type': 'application/json',
        })
            .type('json')
            .send(body)
            .auth(this.options.username, this.options.password)
            .end((res) => {
            if (res.error) {
                this.log.error('Error: %s', JSON.stringify(res.body));
                if (error) {
                    error(res.error);
                }
                else {
                    throw new Error(res.error);
                }
            }
            callback(res.body);
        });
    }
    _get(api, callback, error) {
        var req = request('GET', this.base)
            .query(`/api/v2/${api}`)
            .headers({
            'content-type': 'application/json',
        })
            .type('json')
            .auth(this.options.username, this.options.password)
            .end((res) => {
            if (res.error) {
                this.log.error('Error: %s', JSON.stringify(res.body));
                if (error) {
                    error(res.error);
                }
                else {
                    throw new Error(res.error);
                }
            }
            callback(res.body);
        });
    }
    /**
     * Fetchs test cases from projet/suite based on filtering criteria (optional)
     * @param {{[p: string]: number[]}} filters
     * @param {Function} callback
     */
    fetchCases(filters, callback) {
        let filter = '';
        if (filters) {
            for (var key in filters) {
                if (filters.hasOwnProperty(key)) {
                    filter += '&' + key + '=' + filters[key].join(',');
                }
            }
        }
        let req = this._get(`get_cases/${this.options.projectId}&suite_id=${this.options.suiteId}${filter}`, (body) => {
            if (callback) {
                callback(body);
            }
        });
    }
    /**
     * Publishes results of execution of an automated test run
     * @param {string} name
     * @param {string} description
     * @param {TestRailResult[]} results
     * @param {Function} callback
     */
    publish(name, description, results, callback) {
        this.log.info(`Publishing ${results.length} test result(s) to ${this.options.testRailUrl}`);
        this._post(`add_run/${this.options.projectId}`, {
            suite_id: this.options.suiteId,
            name: name,
            description: description,
            assignedto_id: this.options.assignedToId,
            include_all: true,
        }, (body) => {
            const runId = body.id;
            this.log.info(`Results published to ${this.base}?/runs/view/${runId}`);
            this._post(`add_results_for_cases/${runId}`, {
                results: results,
            }, (body) => {
                // execute callback if specified
                if (callback) {
                    callback();
                }
            });
        });
    }
}
exports.TestRail = TestRail;
//# sourceMappingURL=testrail.js.map