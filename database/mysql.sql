-- 创建数据库
CREATE DATABASE mypro_data;
-- 进入数据库
use mypro_data;
-- 创建表
CREATE TABLE `test`(
   `test_id` INT UNSIGNED AUTO_INCREMENT,
   `test_title` VARCHAR(100) NOT NULL,
   `test_author` VARCHAR(40) NOT NULL,
   `test_date` DATE,
   PRIMARY KEY ( `test_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 插入数据
INSERT INTO test 
    (test_title, test_author, test_date)
    VALUES
    ("1231", "3123", NOW());

-- 创建用户表
CREATE TABLE `user_tb`(
    `user_id` INT UNSIGNED AUTO_INCREMENT,
   `user_tel` VARCHAR(16) NOT NULL,
   `user_psd` VARCHAR(100) NOT NULL,
   `user_type` VARCHAR(40) NOT NULL,
   `user_date` DATE,
   PRIMARY KEY ( `user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 插入用户

INSERT INTO user_tb 
    (user_tel, user_psd, user_type, user_date)
    VALUES
    ()

-- 发布需求的表
CREATE TABLE `publish_tb` (
    `publish_id` INT UNSIGNED AUTO_INCREMENT,
    `publish_name` VARCHAR(16) NOT NULL,
    `publish_tel` VARCHAR(16) NOT NULL,
    `publish_content` VARCHAR(256) NOT NULL,
    `publish_code` VARCHAR(16) NOT NULL,
    `publish_user_name` VARCHAR(16) NOT NULL,
    `publish_date` DATE,
    PRIMARY KEY ( `publish_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 发布房源信息表

CREATE TABLE `house_info_tb` (
    `houseinfo_id` INT UNSIGNED AUTO_INCREMENT DEFAULT 10000,
    `houseinfo_name` VARCHAR(100) NOT NULL,
    `houseinfo_company` VARCHAR(100) NOT NULL,
    `houseinfo_floor` VARCHAR(16) NOT NULL,
    `houseinfo_floor_info` VARCHAR(200) NOT NULL,
    `houseinfo_car_stop` VARCHAR(200) NOT NULL,
    `houseinfo_dt` VARCHAR(200) NOT NULL,
    `houseinfo_kt` VARCHAR(200) NOT NULL,
    `houseinfo_all_company` VARCHAR(300) NOT NULL,
    `houseinfo_subway` VARCHAR (300) NOT NULL,
    `houseinfo_lon` VARCHAR(16) NOT NULL,
    `houseinfo_lat` VARCHAR(16) NOT NULL,
    `houseinfo_code` VARCHAR(16) NOT NULL,
    `houseinfo_date` DATE,
    PRIMARY KEY ( `houseinfo_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 打点城市列表

CREATE TABLE `city_tb` (
  `belong_city` varchar(20) NOT NULL,
  `city_name` varchar(20) NOT NULL,
  `city_lat` decimal(10,6) NOT NULL,
  `city_lng` decimal(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 插入城市

INSERT INTO `city_tb` 
    (belong_city, city_name, city_lat, city_lng) 
    VALUES 
    ('长沙','芙蓉区', '28.203811', '113.020969'),
    ('长沙','天心区', '28.144471', '112.996195'),
    ('长沙','岳麓区', '28.202707', '112.908699'),
    ('长沙','开福区', '28.260219', '113.024730'),
    ('长沙','雨花区', '28.146444', '113.020201'),
    ('长沙','望城区', '28.277902', '112.848535'),
    ('长沙','长沙县', '28.322759', '113.224946'),
    ('长沙','宁乡县', '28.131213', '112.360465'),
    ('长沙','星沙', '28.243270', '113.086835'),
    ('永州','零陵', '26.331871', '111.582947'),
    ('永州','冷水滩', '26.493915', '111.607668'),
    ('永州','祁阳县', '26.517194', '111.758296'),
    ('永州','东安县', '26.444757', '111.511082'),