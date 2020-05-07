'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const Project_PATH = path.join(__dirname, '..');

/**
 * 公共配置文件
 */
let defaultConfig = {
    //Mysql配置
    Mysql: {
        database: 'mingou',
        username: 'root',
        password: 'mark6275',
        host: '39.100.127.116',
        modelPath: path.join(Project_PATH, 'models') //表结构路径(不需要改)
    },
    //Redis配置
    Redis: {
        host: '39.100.127.116',
        port: 6379,
        password: 'chengshubei123',
        db: 7
    },
    //应用配置
    App: {
        static: false,
        outside: false,
        debug: true
    },
    //找币api接口
    Exchange: {
        protocol: 'http',
        host: '172.16.100.7:9901',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'User-Agent': 'cloud_miner nodejs request',
            'Fzm-Request-Source': 'cloud_miner'
        },
        keys: [
            't1AuAe0pN1C8GJy',
            't1AuAe0pN1C8GJy',
            'eewewrewrwerwerwe',
            'eewewrewrwerwerwe'
        ],
        wfroms: {
            'BB360': '013b6171783ec3ba',
            'GALAXY': '8c6ceac246a6f6cc',
            'HKJB': 'f6875d78dd7e2baa',
            'HKBG': '5b2caef558266fff'
        }
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
