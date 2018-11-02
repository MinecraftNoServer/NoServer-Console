const assert = require('assert');
const fs = require('fs');
const fileServer = require('../service/fileServer').create();
const path = require('path');
fileServer.makeFile(path.join(__dirname, './temp'), 'test.ini');
fileServer.makeDir(path.join(__dirname, './temp', 'test'));
fileServer.makeDir(path.join(__dirname, './temp/1/2/3/4'), 'test');
fileServer.makeDir(path.join(__dirname, './temp/1/2/3/4'), 'test2');
fileServer.makeFile(path.join(__dirname, './temp/1/2/3/4/5'), 'test.ini');

fileServer.deleteFile(path.join(__dirname, './temp/1/2/3/4'), 'test2');
fileServer.deleteDir(path.join(__dirname, './temp/1/2/3/4'));
fileServer.getFileList(path.join(__dirname, './temp'));
fileServer.getFileInfo(path.join(__dirname, './temp'), 'test.ini');
