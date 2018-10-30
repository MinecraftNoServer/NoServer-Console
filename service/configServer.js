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
        return 'D:\\NoServer\\Server\\.minecraft'
    }
    getMemMax() {
        return 8102;
    }
    getMemMin() {
        return 1024;
    }
    getForgeVersion() {
        return 'forge-1.12.2-14.23.4.2707-universal.jar';
    }
}

module.exports = new configServer;