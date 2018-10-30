const WebSocket = require('ws')
const url = require('url')
const gameServer = require('./gameServer')

class WsService {

    constructor(server, option) {
        this.option = option
        this.wsServer = new WebSocket.Server({ server });
        this.wsServer.on('connection', (socket) => {

            this.socket = socket;

            this.socket.on('message', (data) => {
                gameServer.sendMessage(data);
            })

            this.socket.on('close', () => {
                this.socket = null;
            })

        });
    }

    sendMessage(data) {
        this.socket.send(data);
    }
}

module.exports = WsService