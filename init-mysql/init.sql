CREATE DATABASE test;

use test;

CREATE TABLE IF NOT EXISTS `user`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   PRIMARY KEY( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;

INSERT INTO `user` (`name`, `password`) VALUE ('Tom', 'password');
INSERT INTO `user` (`name`, `password`) VALUE ('Bob', 'correct_staple_horse_battery_something');
INSERT INTO `user` (`name`, `password`) VALUE ('Richard', '*^&bhsd286*@^#as');
