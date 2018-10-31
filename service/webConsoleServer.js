const WebSocket = require('ws')
const url = require('url')
const BaseServer = require('./baseServer')
class WebConsoleServer extends BaseServer {

    constructor(server) {
        super();
        this.wsServer = new WebSocket.Server({ server });
        this.wsServer.on('connection', (socket) => {

            this.socket = socket;

            this.socket.on('message', (data) => {
                server.gameInstance.sendMessage(data);
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

module.exports = WebConsoleServer