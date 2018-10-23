'use strict'
const logger = require('./logUtil');

let instances = {};

class BaseClass {

    constructor(prefix) {
        let name = this.constructor.name + (!prefix ? "" : "_" + prefix)
        this.logger = new logger('File', name);
    }

    static Instance() {
        let obj = new this(...arguments);
        if (!instances[obj.constructor.name]) {
            instances[obj.constructor.name] = obj;
        }
        return instances[obj.constructor.name];
    }
}

module.exports = BaseClass;