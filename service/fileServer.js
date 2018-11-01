'use strict';
const BaseServer = require('./baseServer');
const libpath = require('path');
const fs = require('fs')

class FileServer extends BaseServer {
    constructor() {
        super(...arguments);
    }

    makeFile(path, filename) {
        var fullname=libpath.join(path,filename)
        this.logger.info("creating file: " + fullname)
        fs.writeFileSync(fullname,'','utf8')
    }

    makeDir(path) {
        this.logger.info("creating directory: "+path)
        fs.mkdirSync(path)
    }

    deleteFile(path, filename) {
        var fullname=libpath.join(path,filename)
        this.logger.info("deleting file: "+fullname)
        fs.unlink(fullname)
    }

    deleteDir(path) {
        this.logger.info("deleting directory: "+path)
        if(fs.existsSync(path)) {
            var files=fs.readdirSync(path)
            files.forEach(function(file,index) {
                var curPath=libpath.join(path,file)
                if(fs.statSync(curPath).isDirectory()) {
                    deleteDir(curPath)
                } else {
                    this.logger.debug("removing content: "+curPath)
                    fs.unlinkSync(curPath) // use deleteFile?
                }
            })
            this.logger.debug("removing empty directory: "+path)
            fs.rmdirSync(path)
        }
        this.logger.info("directory: " + path + " not exist. This is not considered as an error.")
    }

    getFileList(path) {
        if(fs.existsSync(path)) {
            return fs.readdirSync(path)
        } else {
            throw new Error("Directory not exist")
        }
    }

    getFileInfo(path, filename) {
        return fs.statSync(libpath.join(path,filename))
    }

    // Return: Promise
    copyFile(src,dest,filename) {
        var src_fullname=libpath.join(src,filename)
        var dest_fullname=libpath.join(dest,filename)
        this.logger.info("Copying from "+src_fullname+" to "+dest_fullname)
        return new Promise(function(resolve,reject){
            var write_stream=fs.createWriteStream(dest_fullname)
            write_stream.on('finish',function(){
                resolve('finish')
            })
            write_stream.on('error',function(){
                reject('error')
            })
            fs.createReadStream(src_fullname).pipe(write_stream)
        })
    }

    async copyDir(src,dest) {
        this.logger.info("copying directory from: " + src + " to " + dest)
        makeDir(dest)
        var lst=getFileList(src)
        lst.forEach(function(file,index){
            var curPath=libpath.join(src,file)
            var destPath=libpath.join(dest,file)
            if(fs.statSync(curPath).isDirectory()) {
                copyDir(curPath,destPath)
            } else {
                this.logger.debug("copying single file: "+curPath)
                await copyFile(src,dest,file)
            }
        })
    }
}

module.exports = FileServer;