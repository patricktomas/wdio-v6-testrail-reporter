"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testrail_1 = require("../lib/testrail");
const testrail_interface_1 = require("../lib/testrail.interface");
describe.skip('TestRail API', () => {
    it('Publish test run', (done) => {
        let testRail = new testrail_1.TestRail({
            testRailUrl: process.env.DOMAIN,
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            projectId: 10,
            suiteId: 104,
        });
        testRail.fetchCases({ type_id: [3], priority_id: [4] }, (cases) => {
            console.log(cases);
            let results;
            cases.forEach((value) => {
                console.log(value.id, value.title);
            });
        });
        testRail.publish('Unit Test of mocha-testrail-reporter', 'Unit Test of mocha-testrail-reporter', [
            {
                case_id: 3033,
                status_id: testrail_interface_1.Status.Passed,
                comment: 'Passing....',
            },
            {
                case_id: 3034,
                status_id: testrail_interface_1.Status.Passed,
            },
            {
                case_id: 3035,
                status_id: testrail_interface_1.Status.Passed,
            },
            {
                case_id: 3036,
                status_id: testrail_interface_1.Status.Failed,
                comment: 'Failure....',
            },
        ], done);
    });
});
//# sourceMappingURL=testrail.js.map