'use strict';
const spawn = require('child_process').spawn;
const BaseServer = require('./baseServer');
const configServer = require('./configServer').create();
const path = require('path');
const readline = require('readline');
class GameServer extends BaseServer {

    _startNewServer(args) {
        try {
            let options = {
                cwd: this.gamePath,
                env: process.env
            }
            let _server = spawn('java', args, options);
            _server.stdout.on('data', (data) => {
                this.webConsoleServer.sendMessage(data);
            })
            _server.stderr.on('data', (data) => {
                this.webConsoleServer.sendMessage(data);
            })
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

    sendMessage(data) {
        if (this.gameServer) {
            this.gameServer.stdin.write(data);
        }
    }

    execServer(webConsoleServer) {
        this.webConsoleServer = webConsoleServer;
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
        this.sendMessage(`stop`);
    }
}

module.exports = GameServer