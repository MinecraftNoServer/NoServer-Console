const express = require('express');
const logger = new (require('./common/logUtil'))('File', 'app');
const path = require('path');
const favicon = require('serve-favicon');
const bodyparser = require('body-parser');
const compress = require('compression');
const session = require('express-session');
const helmet = require('helmet');
const cookieparser = require('cookie-parser');
const configServer = require('./service/configServer');
const app = express();

const start = async () => {
    try {
        //let config = await configServer.getConfig(path.join(__dirname, 'serverConfig.json'));
        let config = {}
        logger.info(`>>>>>>>>>>>> NO-SERVER WEB CONSOLE START >>>>>>>>>>>>>`);
        app.disable('x-powered-by');
        app.use(helmet());
        app.use(compress());
        app.use(bodyparser.json({
            limit: '10mb'
        }));
        app.use(bodyparser.urlencoded({
            extended: false,
            limit: '20mb'
        }));
        app.use(cookieparser());
        app.use(express.static(path.join(__dirname, './static')));
        let allowCrossDomain = (req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'example.com');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        }
        app.use(allowCrossDomain);

        app.use('/static', express.static(path.join(__dirname, './static/res')));
        app.use('/', require('./router/'));


        app.set('views', './template');
        app.set('view engine', 'ejs');
        app.set('host', config.ip || 'localhost');
        app.set('port', config.port || '8080');

        const server = app.listen(app.get('port'), app.get('host'), () => {
            logger.info(`<<<<<<<<<<<< NO-SERVER START SUCCESS! <<<<<<<<<<<<`);
            logger.info(`SERVER START TIME: ${Date()}`)
            logger.info(`SERVER LISTENING ON PORT ${app.get('port')}`);
        })

    } catch (err) {
        logger.error(err);
        throw (err);
    }
}

start()

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
})