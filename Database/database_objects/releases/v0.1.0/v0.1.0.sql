--liquibase formatted sql

--changeset arman:ar1
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `waterfall_swe` DEFAULT CHARACTER SET utf8 ;
USE `waterfall_swe` ;

CREATE TABLE IF NOT EXISTS `waterfall_swe`.`user` (
                                                      `user_id` INT NOT NULL AUTO_INCREMENT,
                                                      `user_email` VARCHAR(75) NOT NULL,
    `user_salt` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`user_id`))
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`privilege` (
                                                           `privilege_id` INT NOT NULL AUTO_INCREMENT,
                                                           `privilege_techcode` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`privilege_id`))
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`role` (
                                                      `role_id` INT NOT NULL AUTO_INCREMENT,
                                                      `role_name` VARCHAR(45) NOT NULL,
    `privilege_privilege_id` INT NOT NULL,
    PRIMARY KEY (`role_id`),
    INDEX `fk_role_privilege1_idx` (`privilege_privilege_id` ASC) VISIBLE,
    CONSTRAINT `fk_role_privilege1`
    FOREIGN KEY (`privilege_privilege_id`)
    REFERENCES `waterfall_swe`.`privilege` (`privilege_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`group` (
                                                       `group_id` INT NOT NULL AUTO_INCREMENT,
                                                       `group_name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`group_id`))
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`project` (
                                                         `project_id` INT NOT NULL AUTO_INCREMENT,
                                                         `project_name` VARCHAR(45) NOT NULL,
    `project_description` VARCHAR(250) NULL,
    `project_due_date` DATETIME NULL,
    `project_assigned_group_ids` VARCHAR(45) NULL COMMENT 'Assigned groups comma separated. After a comma there has to be one blank space!',
    `group_group_id` INT NOT NULL,
    PRIMARY KEY (`project_id`),
    INDEX `fk_project_group1_idx` (`group_group_id` ASC) VISIBLE,
    CONSTRAINT `fk_project_group1`
    FOREIGN KEY (`group_group_id`)
    REFERENCES `waterfall_swe`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`staff` (
                                                       `staff_id` INT NOT NULL,
                                                       `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `target_hours` DOUBLE NULL,
    `salary_euro` DOUBLE NULL,
    `max_vacation_days` INT NULL,
    `supervisor_id` INT NULL COMMENT 'The id of the supervisor of the employee. Since staff can be any role, this attribute can be null (since a supervisor can not supervise himself)',
    `user_user_id` INT NOT NULL,
    `role_role_id` INT NOT NULL,
    `project_project_id` INT NOT NULL,
    `group_group_id` INT NOT NULL,
    PRIMARY KEY (`staff_id`),
    INDEX `fk_staff_user1_idx` (`user_user_id` ASC) VISIBLE,
    INDEX `fk_staff_role1_idx` (`role_role_id` ASC) VISIBLE,
    INDEX `fk_staff_project1_idx` (`project_project_id` ASC) VISIBLE,
    INDEX `fk_staff_group1_idx` (`group_group_id` ASC) VISIBLE,
    CONSTRAINT `fk_staff_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `waterfall_swe`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_staff_role1`
    FOREIGN KEY (`role_role_id`)
    REFERENCES `waterfall_swe`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_staff_project1`
    FOREIGN KEY (`project_project_id`)
    REFERENCES `waterfall_swe`.`project` (`project_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_staff_group1`
    FOREIGN KEY (`group_group_id`)
    REFERENCES `waterfall_swe`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`flex_time` (
                                                           `available_flextime` DOUBLE NULL,
                                                           `flex_time_techcode` VARCHAR(45) NULL,
    `staff_staff_id` INT NOT NULL,
    PRIMARY KEY (`staff_staff_id`),
    CONSTRAINT `fk_flex_time_staff1`
    FOREIGN KEY (`staff_staff_id`)
    REFERENCES `waterfall_swe`.`staff` (`staff_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`absence` (
                                                         `start_time` DATETIME NULL,
                                                         `end_time` DATETIME NULL,
                                                         `permission_status` VARCHAR(45) NULL,
    `type_techcode` VARCHAR(45) NOT NULL,
    `staff_staff_id` INT NOT NULL,
    PRIMARY KEY (`staff_staff_id`),
    CONSTRAINT `fk_absence_staff1`
    FOREIGN KEY (`staff_staff_id`)
    REFERENCES `waterfall_swe`.`staff` (`staff_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `waterfall_swe`.`timetable` (
                                                           `index` VARCHAR(45) NOT NULL,
    `date` DATE NOT NULL,
    `weekday` VARCHAR(20) NOT NULL,
    `start` DATETIME NOT NULL,
    `end` DATETIME NOT NULL,
    `pause_minutes` INT NOT NULL,
    `performed_hours` DOUBLE NOT NULL,
    `difference_performed_target` DOUBLE NOT NULL,
    `abscence` VARCHAR(45) NULL,
    `staff_staff_id` INT NOT NULL,
    PRIMARY KEY (`index`),
    INDEX `fk_timetable_staff1_idx` (`staff_staff_id` ASC) VISIBLE,
    CONSTRAINT `fk_timetable_staff1`
    FOREIGN KEY (`staff_staff_id`)
    REFERENCES `waterfall_swe`.`staff` (`staff_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
