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
router.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Cache-Control','no-cache');
})

router.get('/register', function (req, res, next) {
  console.log('123123213123');
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
  let select = 'select * from user_tb where user_tel = "' + req.query.tel + '" and user_psd = "' + req.query.psd + '"';
  selectData(select, res);
})

router.get('/publish', function(req, res, next) {
  let select = 'INSERT INTO publish_tb (publish_name, publish_tel, publish_content, publish_user_name, publish_code, publish_date)' +
        'VALUES ("'+req.query.sendUser+'","'+req.query.sendMoble+'","'+req.query.sendContent+'","'+ req.query.userName +'","否",NOW())';
  insertData(select, res);
})

router.get('/publishInfo', function(req, res, next) {
  let select = 'select * from publish_tb where publish_user_name = "' + req.query.userName +'"';
  selectData(select, res);
})
// 查全部楼盘
router.get('/allhoseinfo', function(req, res, next) {
  let select = 'select * from house_info_tb';
  selectData(select, res);
});
// 查看指定楼盘信息
router.get('/houseInfoSelect', function(req, res, next) {
  let select = 'select * from house_info_tb where houseinfo_name = "' + req.query.houseInfo + '"';
  selectData(select, res);
})

router.get('/publishHouse', function (req, res, next) {
  let select = 'INSERT INTO house_publish_tb (house_property,house_mkarea,house_price,house_handle,house_handle_date,house_short_date,'+
    'house_pay_type,house_jy,house_zxmz,house_look_time_start,house_look_time_end,house_disc_content,house_publish_user,'+
    'house_floor_own,houseinfo_date)' +
        'VALUES (' +
          '"' + req.query.house_property + '",' +
          '"' + req.query.house_mkarea + '",' +
          '"' + req.query.house_price + '",' +
          '"' + req.query.house_handle + '",' +
          '"' + req.query.house_handle_date + '",' +
          '"' + req.query.house_short_date + '",' +
          '"' + req.query.house_pay_type + '",' +
          '"' + req.query.house_jy + '",' +
          '"' + req.query.house_zxmz + '",' +
          '"' + req.query.house_look_time_start + '",' +
          '"' + req.query.house_look_time_end + '",' +
          '"' + req.query.house_disc_content + '",' +
          '"' + req.query.house_publish_user + '",' +
          '"' + req.query.house_floor_own + '",' +
          'NOW()'+
        ');';
  insertData(select, res);
});

router.get('/publishBuild', function (req, res, next) {
  let select = 'INSERT INTO house_info_tb (houseinfo_name,houseinfo_company,houseinfo_floor,houseinfo_floor_info,houseinfo_car_stop,houseinfo_dt,'+
    'houseinfo_kt,houseinfo_all_company,houseinfo_subway,houseinfo_area,houseinfo_area_detail,houseinfo_lon,houseinfo_lat,'+
    'houseinfo_publish_user,houseinfo_code,houseinfo_date)' +
        'VALUES (' +
          '"' + req.query.houseinfo_name + '",' +
          '"' + req.query.houseinfo_company + '",' +
          '"' + req.query.houseinfo_floor + '",' +
          '"' + req.query.houseinfo_floor_info + '",' +
          '"' + req.query.houseinfo_car_stop + '",' +
          '"' + req.query.houseinfo_dt + '",' +
          '"' + req.query.houseinfo_kt + '",' +
          '"' + req.query.houseinfo_all_company + '",' +
          '"' + req.query.houseinfo_subway + '",' +
          '"' + req.query.houseinfo_area + '",' +
          '"' + req.query.houseinfo_area_detail + '",' +
          '"' + req.query.houseinfo_lon + '",' +
          '"' + req.query.houseinfo_lat + '",' +
          '"' + req.query.houseinfo_publish_user + '",' +
          '"否",'+
          'NOW()'+
        ');';
  insertData(select, res);
});

router.get('/selectHouseInfo', function(req, res, next) {
  let select = 'select * from house_publish_tb where house_publish_user = "' + req.query.house_publish_user + '"';
  selectData(select, res);
});

router.get('/publishNoAccept', function(req, res, next) {
  let select = 'select * from publish_tb where publish_code = "' + req.query.publish_code + '"';
  selectData(select, res);
})

module.exports = router;
