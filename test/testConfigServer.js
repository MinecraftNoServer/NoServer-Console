const configServer = require('../src/service/configServer').create();

console.log(configServer.getGamePath());
console.log(configServer.getMemMax());
console.log(configServer.getMemMin());
console.log(configServer.getForgeVersion());