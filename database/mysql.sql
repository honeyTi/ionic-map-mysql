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