-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointmentID` int NOT NULL,
  `date-time` datetime DEFAULT NULL,
  `staff_staffID` int NOT NULL,
  `customers_customerID` int NOT NULL,
  `cuts_cutID` int NOT NULL,
  PRIMARY KEY (`appointmentID`),
  KEY `fk_appointments_staff1_idx` (`staff_staffID`),
  KEY `fk_appointments_cust_idx` (`customers_customerID`),
  KEY `fk_appointments_cuts_idx` (`cuts_cutID`),
  CONSTRAINT `fk_appointments_cust` FOREIGN KEY (`customers_customerID`) REFERENCES `customers` (`customerID`),
  CONSTRAINT `fk_appointments_cuts` FOREIGN KEY (`cuts_cutID`) REFERENCES `cuts` (`cutID`),
  CONSTRAINT `fk_appointments_staff1` FOREIGN KEY (`staff_staffID`) REFERENCES `staff` (`staffID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerID` int NOT NULL AUTO_INCREMENT,
  `fName` varchar(45) NOT NULL,
  `sName` varchar(45) NOT NULL,
  `dob` datetime DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Keith','Smith','1990-12-31 23:59:59','cust@test.com'),(2,'test','Kieran',NULL,'test@kieran.com'),(3,'Kieran','Hodgson',NULL,'test@test.com'),(4,'Jason','Ankers',NULL,'jankers@gmail.com'),(5,'john','smith',NULL,'\'john@smith.com\'');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuts`
--

DROP TABLE IF EXISTS `cuts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuts` (
  `cutID` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `hairLength` varchar(45) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `cost` varchar(45) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `available` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`cutID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuts`
--

LOCK TABLES `cuts` WRITE;
/*!40000 ALTER TABLE `cuts` DISABLE KEYS */;
INSERT INTO `cuts` VALUES (1,'blah TST','huahahah','short','1','1000','sodfuhosubndf',1);
/*!40000 ALTER TABLE `cuts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staffID` int NOT NULL,
  `fName` varchar(45) NOT NULL,
  `sName` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`staffID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'John','Doe','Owner');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `customer_customerID` int DEFAULT NULL,
  `staff_staffID` int DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `userID_UNIQUE` (`userID`),
  UNIQUE KEY `staff_staffID_UNIQUE` (`staff_staffID`),
  KEY `fk_user_customers_idx` (`customer_customerID`),
  KEY `fk_user_staff1_idx` (`staff_staffID`),
  CONSTRAINT `fk_user_cust1` FOREIGN KEY (`customer_customerID`) REFERENCES `customers` (`customerID`),
  CONSTRAINT `fk_user_staff1` FOREIGN KEY (`staff_staffID`) REFERENCES `staff` (`staffID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'cust@test.com','test2',1,NULL),(2,'admin@test.com','test1',NULL,1),(3,'test@kieran.com','test',2,NULL),(4,'test@test.com','test',3,NULL),(5,'jankers@gmail.com','test1234',4,NULL),(6,'john@smith.com','johnjohm',5,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16 15:59:01
