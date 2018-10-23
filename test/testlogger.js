const BaseClass = require('../common/baseClass');

class loggerTest extends BaseClass {
    constructor() {
        super(...arguments);
        console.log('test begin');
    }

    test() {
        this.logger.info(`hello, this is log info test`);
        this.logger.error(`hello, this is log error test`);
    }
}

let logtest = new loggerTest;
logtest.test();

