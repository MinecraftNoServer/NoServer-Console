'use strict';
const spawn = require('child_process').spawn;
const BaseServer = require('./baseServer');
const configServer = require('./configServer');
const path = require('path');
const readline = require('readline');

class GameServer extends BaseServer {

    _startNewServer(options) {
        try {
            let _server = spawn('java', options);
            this.out = readline.createInterface({
                input: _server.stdout
            });
            this.err = readline.createInterface({
                input: _server.stderr
            });
            this.out.on('line', (linedata) => {
                this.logger.info(linedata);
            });
            this.err.on('line', (linedata) => {
                this.logger.error(linedata);
            });
            this.logger.info(`Server start success`);
            return _server;
        } catch (err) {
            this.logger.error(`Server start error, msg=${err.message}`);
            throw err;
        }
    }

    svrout() {

    }

    execServer() {
        this.gamePath = configServer.getGamePath();
        this.memMax = configServer.getMemMax();
        this.memMin = configServer.getMemMin();
        this.forgeVersion = configServer.getForgeVersion();
        let options = []
        options.push(`-Xmx${this.memMax}M`);
        options.push(`-Xms${this.memMin}M`);
        options.push(`-jar`);
        options.push(`${path.join(this.gamePath, this.forgeVersion)}`);
        this.gameServer = this._startNewServer(options);

    }

    stopServer() {

    }
}

module.exports = new GameServer