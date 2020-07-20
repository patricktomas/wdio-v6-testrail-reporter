# WDIO Mocha Testrail Reporter

====================
> A WebdriverIO v6 reporter for Testrail. Yes, it works on my machine.
> For v4 version see [original reporter](https://github.com/oxynade/wdio-testrail-reporter)

## Configuration

Add this line to your devDependencies in package.json:

`
"wdio-v6-testrail-reporter": "https://github.com/Virtim/wdio-v6-testrail-reporter.git",
`

Import this library in you wdio.conf.js

```js
const TestRailReporter = require('../wdio-v6-testrail-reporter')
```

Your reporters should look like this:

```js
    reporters: ['spec', [TestRailReporter, {
      testRailUrl: 'YourCompanyName.testrail.io',
      username: 'email@companyname.com',
      password: 'testrail api key',
      projectId: number,
      suiteId: number,
      runName: string,
      includeAll: true,
    }]],
```

## References

- https://www.npmjs.com/package/mocha-testrail-reporter
- https://www.npmjs.com/package/wdio-v5-testrail-reporter
- https://www.npmjs.com/package/wdio-testrail-reporter
- https://www.npmjs.com/package/wdio-reportportal-reporter
- http://webdriver.io/guide/reporters/customreporter.html
- http://docs.gurock.com/testrail-api2/start
