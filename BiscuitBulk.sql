SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`customers` ;

CREATE TABLE IF NOT EXISTS `mydb`.`customers` (
  `customerID` INT NOT NULL,
  `fName` VARCHAR(45) NOT NULL,
  `sName` VARCHAR(45) NOT NULL,
  `dob` DATETIME NOT NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`customerID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`staff` ;

CREATE TABLE IF NOT EXISTS `mydb`.`staff` (
  `staffID` INT NOT NULL,
  `fName` VARCHAR(45) NOT NULL,
  `sName` VARCHAR(45) NULL,
  `position` VARCHAR(45) NULL,
  PRIMARY KEY (`staffID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `userID` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `customer_customerID` INT NULL,
  `staff_staffID` INT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `userID_UNIQUE` (`userID` ASC) VISIBLE,
  INDEX `fk_user_customers_idx` (`customer_customerID` ASC) VISIBLE,
  INDEX `fk_user_staff1_idx` (`staff_staffID` ASC) VISIBLE,
  UNIQUE INDEX `customer_customerID_UNIQUE` (`customer_customerID` ASC) VISIBLE,
  UNIQUE INDEX `staff_staffID_UNIQUE` (`staff_staffID` ASC) VISIBLE,
  CONSTRAINT `fk_user_customers`
    FOREIGN KEY (`customer_customerID`)
    REFERENCES `mydb`.`customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_staff1`
    FOREIGN KEY (`staff_staffID`)
    REFERENCES `mydb`.`staff` (`staffID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`appointments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`appointments` ;

CREATE TABLE IF NOT EXISTS `mydb`.`appointments` (
  `appointmentID` INT NOT NULL,
  `date-time` DATETIME NULL,
  `staff_staffID` INT NOT NULL,
  `customers_customerID` INT NOT NULL,
  PRIMARY KEY (`appointmentID`),
  INDEX `fk_appointments_staff1_idx` (`staff_staffID` ASC) VISIBLE,
  INDEX `fk_appointments_customers1_idx` (`customers_customerID` ASC) VISIBLE,
  CONSTRAINT `fk_appointments_staff1`
    FOREIGN KEY (`staff_staffID`)
    REFERENCES `mydb`.`staff` (`staffID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_appointments_customers1`
    FOREIGN KEY (`customers_customerID`)
    REFERENCES `mydb`.`customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cuts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`cuts` ;

CREATE TABLE IF NOT EXISTS `mydb`.`cuts` (
  `cutID` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `hairLength` VARCHAR(45) NULL,
  `duration` VARCHAR(45) NULL,
  `cost` VARCHAR(45) NULL,
  `img` VARCHAR(45) NULL,
  `available` TINYINT NOT NULL DEFAULT 0,
  `appointments_appointmentID` INT NOT NULL,
  PRIMARY KEY (`cutID`),
  INDEX `fk_cuts_appointments1_idx` (`appointments_appointmentID` ASC) VISIBLE,
  CONSTRAINT `fk_cuts_appointments1`
    FOREIGN KEY (`appointments_appointmentID`)
    REFERENCES `mydb`.`appointments` (`appointmentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
