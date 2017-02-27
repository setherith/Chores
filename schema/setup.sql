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
  
ALTER TABLE `chores`.`tasks` 
ADD COLUMN `created` DATETIME NOT NULL AFTER `name`,
ADD COLUMN `creator` INT NOT NULL AFTER `created`,
ADD COLUMN `complete` TINYINT NOT NULL AFTER `creator`;

drop table if exists users;
CREATE TABLE `chores`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `completed` INT NOT NULL DEFAULT 0,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

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

DROP procedure IF EXISTS `add_task`;
DELIMITER $$
USE `chores`$$
CREATE PROCEDURE `add_task` (in p_name varchar(150), in user_id int(11))
BEGIN
      insert into tasks (`name`, created, creator, complete)
      values (p_name, sysdate(), user_id, false);
END$$
DELIMITER ;

-- FUNCTIONS
drop function if exists `validate_user`;
DELIMITER $$
use `chores`$$
create function `validate_user` (p_username varchar(45), p_password varchar(32)) returns int(1)
begin
  declare result int(1);
  
  select count(1)
  from users
  where username = p_username
  and `users`.`password` = md5(p_password)
  into result;
  
  return result;
END$$

DELIMITER ;

-- SEED DATA
insert into tasks (name, created, creator, complete)
values ('Put dishes away', sysdate(), 1, false), 
('Take rubbish out', sysdate(), 1, false), 
('Clean cat litter tray', sysdate(), 1, false);

insert into users (username, password, created)
values ('test_user', md5('password123'), sysdate());
