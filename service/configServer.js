'use strict'
const BaseServer = require('./baseServer');
const fs = require('fs')
class configServer extends BaseServer {
    constructor() {
        super(...arguments);
        this.gameServerConfig = {};
        this.webServerConfig = {};
        this.dataServerConfig = {};
        this._init();
    }
    _init() {

    }
    getGamePath() {
        return 'F:\\NoServerTest\\'
    }
    getMemMax() {
        return 8102;
    }
    getMemMin() {
        return 1024;
    }
    getForgeVersion() {
        return 'test.jar';
    }
}

module.exports = configServer;