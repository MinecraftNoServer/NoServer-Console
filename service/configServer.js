// this.gamePath = configServer.getGamePath();
//         this.memMax = configServer.getMemMax();
//         this.memMin = configServer.getMemMin();
//         this.forgeVersion = configServer.getForgeVersion();
//         let options = `-Xmx${this.memMax}M -Xms${this.memMin}M -jar ${this.forgeVersion}`;
//         this.gameServer = this._startNewServer(options);
'use strict'
const BaseServer = require('./baseServer');

class configServer extends BaseServer {
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