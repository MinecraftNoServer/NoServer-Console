'use strict';
const logger = new (require('../common/logUtil'))('File', 'router');
const express = require('express');
const initRouter = () => {
    const router = express.Router();
    router.get('/', (req, res) => {
        logger.info(`index request`);
        res.render('index');
    })
    router.get('/console', (req, res) => {
        res.render('xterm', {
            sshConfig: {
                wsurl: 'localhost'
            }
        });
    })
    return router;
}

module.exports = initRouter();