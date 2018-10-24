'use strict';
const logger = new (require('../common/logUtil'))('File', 'router');
const express = require('express');
const initRouter = () => {
    const router = express.Router();
    router.get('/', (req, res) => {
        logger.info(`index request`);
        res.render('index');
    })

    return router;
}

module.exports = initRouter();