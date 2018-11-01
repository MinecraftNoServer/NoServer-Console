'use strict';
const BaseServer = require('./baseServer');

class FileServer extends BaseServer {
    constructor() {
        super(...arguments);
    }

    makeFile(path, filename) {

    }

    makeDir(path) {

    }

    deleteFile(path, filename) {

    }

    deleteDir(path) {

    }

    getFileList(path) {

    }

    getFileInfo(path, filename) {

    }

    copyDir(path, src, dist) {

    }

    copyFile(path, filename, src, dist) {

    }

    copyDir(path, src, dist) {

    }

    copyFile(path, filename, src, dist) {

    }

}

module.exports = FileServer;