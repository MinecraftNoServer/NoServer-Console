
'use strict';
var mysql = require('mysql');
const logger = require('./log_utils')('File', 'dbUtils');

class DbUtil {

    constructor() {
        this.pool = {};
    }

    getPool(instance) {

        try {
            let poolName = `${instance.host}_${instance.database}`;
            if (!this.pool[poolName]) {
                this.pool[poolName] = mysql.createPool({
                    host: instance.host,
                    user: instance.user,
                    password: instance.password,
                    port: instance.port,
                    database: instance.database
                });
                logger.info(`db_util getPool success ${poolName}`);
            }

            return this.pool[poolName];
        } catch (err) {
            logger.error(`db_util getPool error ${instance.host}_${instance.database} | err.code: ${err.code} | err.message: ${err.message}`);
            throw err;
        }
    }


    query(sql, arr, instance) {
        return new Promise((resolve, reject) => {
            this.getPool(instance).query(sql, arr, (err, rows, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }
}

module.exports = new DbUtil();