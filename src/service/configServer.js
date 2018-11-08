'use strict'
const BaseServer = require('./baseServer');
const ini = require('node-ini');
const fs = require('fs');
const path = require('path');
class ConfigServer extends BaseServer {
    constructor() {
        super(...arguments);
        this.gameServerConfig = {};
        this.webServerConfig = {};
        this.dataServerConfig = {};
        this._init();
    }
    _verify(config) {

    }
    _init() {
        try {
            let configContext = fs.readFileSync(path.join(__dirname, '../../serverConfig.json'), 'utf-8');
            let config = JSON.parse(configContext);
            this._verify(config);
            this.config = config;
        } catch (err) {
            this.logger.error(err);
        }
    }
    getGamePath() {
        return this.config.path;
    }
    getMemMax() {
        return this.config.memMax;
    }
    getMemMin() {
        return this.config.memMin;
    }
    getForgeVersion() {
        return this.config.forge;
    }
}

module.exports = ConfigServer;