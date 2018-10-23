'use strict';
const path = require('path');
const assert = require('assert');
const winston = require('winston');
const callsite = require('callsite');
const moment = require('moment');


//instance cache
const instances = {};

const lineno = function () {
    var stack = callsite()[3];
    return path.basename(stack.getFileName()) + ':' + stack.getLineNumber();
};

class Logger {
    constructor() {
        let type = arguments[0],
            name = arguments[1],
            options = arguments[2];

        assert(winston.transports[type], 'argument type not found in winston.transports');
        assert(!name || typeof name === 'string', 'argument name MUST BE an string');

        if (instances[type + name]) {
            return instances[type + name];
        }
        this.type = type;
        this.name = name;
        this.options = options || {};
        this._initCommon();
        instances[type + name] = this;
    }

    _initDate() {
        //TODO
    }

    _initCommon() {

        this._logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.splat()
            ),
            transports: [
                new (winston.transports.Console)({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true,
                }),
                new (winston.transports.File)({
                    level: 'error',
                    json: true,
                    maxsize: 52428800, // 5MB
                    maxFiles: 100,
                    handleExceptions: true,
                    colorize: true,
                    filename: path.join(this.options.path || './', this.name) + 'error.log'
                }),
                new (winston.transports.File)({
                    level: 'info',
                    json: true,
                    maxsize: 52428800, // 5MB
                    maxFiles: 100,
                    handleExceptions: true,
                    colorize: true,
                    filename: path.join(this.options.path || './', this.name) + '.log'
                })
            ]
        });
    }

    info() {
        let args = [];
        args.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
        args.push(lineno());
        if (arguments.length === 0) {
            return false;
        }
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        this._logger.info(args);
    }

    debug() {
        let args = [];
        args.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
        args.push(lineno());
        if (arguments.length === 0) {
            return false;
        }
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        this._logger.debug(args);
    }

    error() {
        let args = [];
        args.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
        args.push(lineno());
        if (arguments.length === 0) {
            return false;
        }
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        this._logger.error(args);
    }
}

module.exports = Logger;