'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const Project_PATH = path.join(__dirname, '..');
const AliHost = '127.0.0.1';

/**
 * 公共配置文件
 */
let defaultConfig = {
    //Mysql配置
    Mysql: {
        database: 'mingou',
        username: 'root',
        password: 'mark6275',
        host: AliHost,
        port: 3306,
        modelPath: path.join(Project_PATH, 'models') //表结构路径(不需要改)
    },
    //Redis配置
    Redis: {
        host: AliHost,
        port: 6379,
        password: 'MarkZhou62759468',
        db: 0
    },
    //应用配置
    App: {
        static: false,
        outside: false,
        debug: true
    },
    //业务配置
    Logic: {
        New_Person: 232800,
        New_Person_Exceptions: [228731, 231354, 203758, 144424],
        Admin_UID: 0
    }
};
if (fs.existsSync(path.join(__dirname, 'common-local.js'))) {
    defaultConfig = _.merge(defaultConfig, require('./common-local'));
}

module.exports = defaultConfig;
