var express = require('express');
var router = express.Router();
const db = require('../database/mysql');

let insertData = (sql, res) => {
  db.pool.getConnection(function (err, connection) {
    if (err) {
      callback(true);
      return;
    }
    // make the query
    connection.query(sql, function (err, results) {
      if (err) {
        res.json({code: '2', state:'err', results: []});
        callback(true);
        return;
      } else {
        res.json({code: '1', state:'successful', results: []});
      }
    });
  });
}

let queryData = (sql, res, resolve) => {
  let data = [];
  db.pool.getConnection(function (err, connection) {
    if (err) {
      res.json({code: '2', state:'err', results: []});
      callback(true);
      return;
    }
    // make the query
    connection.query(sql, function (err, results) {
      if (err) {
        callback(true);
        return;
      } else {
        data = results;
        resolve(data);
      }
    });
  });
  return data;
}

let selectData = (sql, res) => {
  db.pool.getConnection(function (err, connection) {
    if (err) {
      res.json({code: '2', state:'err', results: []});
      callback(true);
      return;
    }
    // make the query
    connection.query(sql, function (err, results) {
      if (err) {
        res.json({code: '2', state:'err', results: []});
        callback(true);
        return;
      } else {
        if (results.length > 0) {
          res.json({code: '1', state:'successful', results: results});
        } else {
          res.json({code: '0', state:'fail', results: []});
        }
      }
    });
  });
}

router.get('/register', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  let data = [];
  var p = new Promise((resolve, reject) => {
    data = [];
    let selectSql = 'select * from user_tb where user_tel = "' + req.query.tel + '"';
    data = queryData(selectSql, res, resolve);
  });

  p.then((value) => {
    if (value.length > 0) {
      res.json({code:'0', state: 'fail',results: []});
    } else {
      console.log('-------测试--------');
      let sql = 'INSERT INTO user_tb (user_tel, user_psd, user_type, user_date) VALUES ("'+req.query.tel+'","'+req.query.psd+'","'+req.query.select+'",NOW())';
      insertData(sql, res);
    }
  })
});

router.get('/login', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let select = 'select * from user_tb where user_tel = "' + req.query.tel + '" and user_psd = "' + req.query.psd + '"';
  selectData(select, res);
})

router.get('/publish', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let select = 'INSERT INTO publish_tb (publish_name, publish_tel, publish_content, publish_user_name, publish_code, publish_date)' +
        'VALUES ("'+req.query.sendUser+'","'+req.query.sendMoble+'","'+req.query.sendContent+'","'+ req.query.userName +'","否",NOW())';
  insertData(select, res);
})

router.get('/publishInfo', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let select = 'select * from publish_tb where publish_user_name = "' + req.query.userName +'"';
  selectData(select, res);
})

router.get('/city', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let select = 'select * from city_tb';
  selectData(select, res);
})



module.exports = router;
