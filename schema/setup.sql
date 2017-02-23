-- SCHEMA
drop schema if exists chores;
create schema `chores` default character set utf8 collate utf8_bin;

-- USER
use chores;
drop user 'chores_user'@'localhost';
create user 'chores_user'@'localhost' identified by 'user_chores'; 
grant select, update, execute on chores.* to 'chores_user'@'localhost';

-- TABLES
drop table if exists tasks;
CREATE TABLE `chores`.`tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`));

drop table if exists users;
CREATE TABLE `chores`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(16) NOT NULL,
  `completed` INT NOT NULL DEFAULT 0,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

-- SEED DATA
insert into tasks (name)
values ('Clean'), ('Cook'), ('Wash');

insert into users (username, password, created)
values ('test_user', 'password123', sysdate());

-- STORED PROCS
USE `chores`;
DROP procedure IF EXISTS `increment_complete`;
DELIMITER $$
use `chores`$$
create procedure `increment_complete` (in userId int)
begin
    update users
    set completed = completed + 1
    where id = userId;
end$$
DELIMITER ;

DROP procedure IF EXISTS `add_user`;
DELIMITER $$
USE `chores`$$
CREATE PROCEDURE `add_user` (in p_username varchar(45), in p_password varchar(16))
BEGIN
    declare user_count int;
    select count(1) from users
    where username = p_username
    into user_count;

    if user_count = 0 then
        insert into users (username, password, created)
        values (p_username, md5(p_password), sysdate()); 
    end if;
END$$

DELIMITER ;
