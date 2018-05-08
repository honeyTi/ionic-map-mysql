const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(config.mysql_dev);
exports.pool = pool;