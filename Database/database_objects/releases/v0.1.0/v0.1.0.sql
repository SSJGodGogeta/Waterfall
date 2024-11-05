--liquibase formatted sql

--changeset arman:ar1
-- MySQL Script generated by MySQL Workbench
-- Sat Nov  2 16:02:52 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema waterfall_swe
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema waterfall_swe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `waterfall_swe` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `waterfall_swe` ;

-- -----------------------------------------------------
-- Table `waterfall_swe`.`staff_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`staff_group` (
                                                       `group_id` INT NOT NULL AUTO_INCREMENT,
                                                       `group_name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`group_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`project` (
                                                         `project_id` INT NOT NULL AUTO_INCREMENT,
                                                         `project_name` VARCHAR(45) NOT NULL,
    `project_description` VARCHAR(250) NULL DEFAULT NULL,
    `project_due_date` DATETIME NULL DEFAULT NULL,
    `group_group_id` INT NOT NULL,
    PRIMARY KEY (`project_id`),
    INDEX `fk_project_group1_idx` (`group_group_id` ASC) VISIBLE,
    CONSTRAINT `fk_project_group1`
    FOREIGN KEY (`group_group_id`)
    REFERENCES `waterfall_swe`.`staff_group` (`group_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`privilege`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`privilege` (
                                                           `privilege_id` INT NOT NULL AUTO_INCREMENT,
                                                           `privilege_techcode` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`privilege_id`))
    ENGINE = InnoDB
    AUTO_INCREMENT = 5
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`role` (
                                                      `role_id` INT NOT NULL AUTO_INCREMENT,
                                                      `role_name` VARCHAR(45) NOT NULL,
    `privilege_privilege_id` INT NOT NULL,
    PRIMARY KEY (`role_id`),
    INDEX `fk_role_privilege1_idx` (`privilege_privilege_id` ASC) VISIBLE,
    CONSTRAINT `fk_role_privilege1`
    FOREIGN KEY (`privilege_privilege_id`)
    REFERENCES `waterfall_swe`.`privilege` (`privilege_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`user` (
                                                      `user_id` INT NOT NULL AUTO_INCREMENT,
                                                      `user_email` VARCHAR(75) NOT NULL,
                                                    `user_password` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`user_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`timetable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`timetable` (
                                                           `index` VARCHAR(45) NOT NULL,
    `date` DATE NOT NULL,
    `weekday` VARCHAR(20) NOT NULL,
    `start` DATETIME NOT NULL,
    `end` DATETIME NOT NULL,
    `pause_minutes` INT NOT NULL,
    `performed_hours` DOUBLE NOT NULL,
    `difference_performed_target` DOUBLE NOT NULL,
    `abscence` VARCHAR(45) NULL DEFAULT NULL,
    PRIMARY KEY (`index`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`staff` (
                                                       `staff_id` INT NOT NULL,
                                                       `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `target_hours` DOUBLE NULL DEFAULT NULL,
    `salary_euro` DOUBLE NULL DEFAULT NULL,
    `max_vacation_days` INT NULL DEFAULT NULL,
    `supervisor_id` INT NULL DEFAULT NULL COMMENT 'The id of the supervisor of the employee. Since staff can be any role, this attribute can be null (since a supervisor can not supervise himself)',
    `user_user_id` INT NOT NULL,
    `role_role_id` INT NOT NULL,
    `project_project_id` INT NOT NULL,
    `group_group_id` INT NOT NULL,
    `timetable_index` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`staff_id`),
    INDEX `fk_staff_user1_idx` (`user_user_id` ASC) VISIBLE,
    INDEX `fk_staff_role1_idx` (`role_role_id` ASC) VISIBLE,
    INDEX `fk_staff_project1_idx` (`project_project_id` ASC) VISIBLE,
    INDEX `fk_staff_group1_idx` (`group_group_id` ASC) VISIBLE,
    INDEX `fk_staff_timetable1_idx` (`timetable_index` ASC) VISIBLE,
    CONSTRAINT `fk_staff_group1`
    FOREIGN KEY (`group_group_id`)
    REFERENCES `waterfall_swe`.`staff_group` (`group_id`),
    CONSTRAINT `fk_staff_project1`
    FOREIGN KEY (`project_project_id`)
    REFERENCES `waterfall_swe`.`project` (`project_id`),
    CONSTRAINT `fk_staff_role1`
    FOREIGN KEY (`role_role_id`)
    REFERENCES `waterfall_swe`.`role` (`role_id`),
    CONSTRAINT `fk_staff_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `waterfall_swe`.`user` (`user_id`),
    CONSTRAINT `fk_staff_timetable1`
    FOREIGN KEY (`timetable_index`)
    REFERENCES `waterfall_swe`.`timetable` (`index`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`absence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`absence` (
                                                         `absence_id` INT NOT NULL AUTO_INCREMENT,
                                                         `start_time` DATETIME NULL DEFAULT NULL,
                                                         `end_time` DATETIME NULL DEFAULT NULL,
                                                         `permission_status` VARCHAR(45) NULL DEFAULT NULL,
    `type_techcode` VARCHAR(45) NOT NULL,
    `staff_staff_id` INT NOT NULL,
    PRIMARY KEY (`absence_id`),
    INDEX `fk_absence_staff1` (`staff_staff_id` ASC) VISIBLE,
    CONSTRAINT `fk_absence_staff1`
    FOREIGN KEY (`staff_staff_id`)
    REFERENCES `waterfall_swe`.`staff` (`staff_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`databasechangelog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`databasechangelog` (
                                                                   `ID` VARCHAR(255) NOT NULL,
    `AUTHOR` VARCHAR(255) NOT NULL,
    `FILENAME` VARCHAR(255) NOT NULL,
    `DATEEXECUTED` DATETIME NOT NULL,
    `ORDEREXECUTED` INT NOT NULL,
    `EXECTYPE` VARCHAR(10) NOT NULL,
    `MD5SUM` VARCHAR(35) NULL DEFAULT NULL,
    `DESCRIPTION` VARCHAR(255) NULL DEFAULT NULL,
    `COMMENTS` VARCHAR(255) NULL DEFAULT NULL,
    `TAG` VARCHAR(255) NULL DEFAULT NULL,
    `LIQUIBASE` VARCHAR(20) NULL DEFAULT NULL,
    `CONTEXTS` VARCHAR(255) NULL DEFAULT NULL,
    `LABELS` VARCHAR(255) NULL DEFAULT NULL,
    `DEPLOYMENT_ID` VARCHAR(10) NULL DEFAULT NULL)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`databasechangeloglock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`databasechangeloglock` (
                                                                       `ID` INT NOT NULL,
                                                                       `LOCKED` TINYINT NOT NULL,
                                                                       `LOCKGRANTED` DATETIME NULL DEFAULT NULL,
                                                                       `LOCKEDBY` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`ID`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`flex_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`flex_time` (
                                                           `flex_time_id` INT NOT NULL AUTO_INCREMENT,
                                                           `available_flextime` DOUBLE NULL DEFAULT NULL,
                                                           `flex_time_techcode` VARCHAR(45) NULL DEFAULT NULL,
    `staff_staff_id` INT NOT NULL,
    PRIMARY KEY (`flex_time_id`),
    INDEX `fk_flex_time_staff1` (`staff_staff_id` ASC) VISIBLE,
    CONSTRAINT `fk_flex_time_staff1`
    FOREIGN KEY (`staff_staff_id`)
    REFERENCES `waterfall_swe`.`staff` (`staff_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `waterfall_swe`.`project_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `waterfall_swe`.`project_group` (
                                                               `project_id` INT NOT NULL,
                                                               `group_id` INT NOT NULL,
                                                               PRIMARY KEY (`project_id`, `group_id`),
    INDEX `fk_project_group_project_idx` (`project_id` ASC) VISIBLE,
    INDEX `fk_project_group_group_idx` (`group_id` ASC) VISIBLE,
    CONSTRAINT `fk_project_group_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `waterfall_swe`.`staff_group` (`group_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT `fk_project_group_project`
    FOREIGN KEY (`project_id`)
    REFERENCES `waterfall_swe`.`project` (`project_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- changeset arman:ar2
ALTER TABLE `waterfall_swe`.`staff`
DROP FOREIGN KEY `fk_staff_timetable1`;

ALTER TABLE `waterfall_swe`.`staff`
DROP COLUMN `timetable_index`;

ALTER TABLE `waterfall_swe`.`timetable`
    ADD COLUMN `staff_id` INT NOT NULL,
    ADD CONSTRAINT `fk_timetable_staff`
        FOREIGN KEY (`staff_id`)
        REFERENCES `waterfall_swe`.`staff` (`staff_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

--changeset arman:ar3
ALTER TABLE `waterfall_swe`.`user`
    ADD COLUMN `user_token` VARCHAR(255)
        COLLATE utf8mb4_general_ci;
UPDATE `waterfall_swe`.`user`
SET `user_token` = ''
WHERE `user_token` IS NULL OR `user_token` = '';

ALTER TABLE `waterfall_swe`.`user`
    MODIFY COLUMN `user_token` VARCHAR(255) NOT NULL
    COLLATE utf8mb4_general_ci;

-- changeset arman:ar4
ALTER TABLE `waterfall_swe`.`project`
    ADD COLUMN `imageurl` VARCHAR(500) NULL DEFAULT NULL;


ALTER TABLE `waterfall_swe`.`user`
ADD COLUMN `login_timeStamp` TIMESTAMP
COLLATE utf8mb4_0900_ai_ci;