-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
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
  `appointmentID` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` varchar(45) NOT NULL,
  `time_end` varchar(45) NOT NULL,
  `staff_staffID` int NOT NULL,
  `customers_customerID` int NOT NULL,
  `cuts_cutID` int NOT NULL,
  `paid` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`appointmentID`),
  KEY `fk_appointments_staff1_idx` (`staff_staffID`),
  KEY `fk_appointments_cust_idx` (`customers_customerID`),
  KEY `fk_appointments_cuts_idx` (`cuts_cutID`),
  CONSTRAINT `fk_appointments_cust` FOREIGN KEY (`customers_customerID`) REFERENCES `customers` (`customerID`),
  CONSTRAINT `fk_appointments_cuts` FOREIGN KEY (`cuts_cutID`) REFERENCES `cuts` (`cutID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_appointments_staff1` FOREIGN KEY (`staff_staffID`) REFERENCES `staff` (`staffID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (25,'2022-06-01','14:30:00','15:15:00',1,41,1,0),(26,'2022-06-23','15:10:00','15:40:00',1,42,3,0),(27,'2022-05-23','12:30:00','13:15:00',1,41,1,0);
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
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (41,'Kieran','Hodgson','kieran@test.com'),(42,'Jason','Ankers','jason@test.com'),(43,'James','Tatton','james@test.com');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuts`
--

DROP TABLE IF EXISTS `cuts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuts` (
  `cutID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` longtext,
  `hairLength` varchar(45) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `cost` varchar(45) DEFAULT NULL,
  `img` longtext,
  `available` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`cutID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuts`
--

LOCK TABLES `cuts` WRITE;
/*!40000 ALTER TABLE `cuts` DISABLE KEYS */;
INSERT INTO `cuts` VALUES (1,'Skin fade','The process of fading the skin on the back and sides of the head from any length to the bare skin.','Short','45','12','https://www.menshairstyletrends.com/wp-content/uploads/2020/11/Skin-fade-haircut-short-on-top-peteyrock_thebarber.jpg',1),(2,'Trim','For when you\'re happy with the length of your hair and you just want it tidying up.','Any','30','9','https://i.insider.com/5820a7c246e27a28008b51eb?width=1000&format=jpeg&auto=webp',1),(3,'All-over','1 length over the top creating a uniform look.','Very Short','30','9','https://menshairstylesfix.com/wp-content/uploads/2018/04/Number-8-Haircut-400x432.jpg',1),(4,'Texturing','Trimming and adding texture to the hair for a modern look.','Any','30','9','https://media.istockphoto.com/photos/barber-and-bearded-man-in-barber-shop-picture-id963431900?k=20&m=963431900&s=612x612&w=0&h=ARf3O8IjmARwVeFWlzc94C0EkxU4VbRB1PuM5ymA00s=',1),(5,'Styiling','Applying products and holding material to the hair.','Any','45','10','https://www.byrdie.com/thmb/HRb0lX43_wRZHir5tKi4qWGOZWQ=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-950397110-004d8e1f8735412994f8d87d0b96ba6f.jpg',1),(6,'Patterns','Cutting in patterns to the back, sides or top of the hair.','Short','60','12','https://therighthairstyles.com/wp-content/uploads/900x/designs-for-men/3-greek-hair-design-for-men.jpg',0),(7,'Beard trim','Shaping and trimming the beard and moustache.','Any','15','4','data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUZGRgaGBoaGhoYGhwYGBwYGhgaGRgaGBwcIS4lHCErHxgcJjgoKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQkJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDE0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA+EAACAQIEAwYDBwMDBAIDAAABAhEAAwQSITEFQVEGImFxgaETkfAHMkJSscHRYuHxI3KiFDOS0nOyFRZD/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAAIDAQADAQEAAAAAAAAAAQIREiExQRNRYQMi/9oADAMBAAIRAxEAPwDrlCiFHQGBRgUKOgFCgKOgKhQoUCTRUqk0CSKKKNmpsv0paui4pWWqbiuIKKWKyPKab7J8Z+NntsZZIKnmUOmvWD+orMy3dLcetmO390pgbpBgkKojqWFcEdN+uYf3rtX2s3suGRZ1e5t4BST+1cbZdB5++upq30nhhVHLlE/vVlYs89tv7frUbBYaRPr7TWhwXBsRcQNbssyaQYCgxrILEZvSs2tSKlrftPvSmwx3jcD5mY/Sp7YRkZkdCrTsw189d/OnbNqSPCPKAIIrO10irbAiRuZ9D1qXh8KAANpn5aazy6elG9khvQbdcv8AFSrTlmgQZ0HkCYj5A1NrI0PZXhoJzZdI3961V20BtTPAbOS2J6D9KfvvqaKTh7AnWq/jfGksqevh7UnH8QyI2sfxXMuN8SdyxJJE6DmfSp/Iv9p/i/am7cMKxA/KDp7VQ3eLXju7R51HmT3mKgnREGZz+y+9NY5FQKQACSRl+IHcRvnUfd9fGukxZuS0wvaR05ztvMVZW+OYd9XSWjcHnWLV5MEU4E8aaiS10Tg/EUEIr/8AccZZ/DMfLYVecUf4eICTqUUyPGY9h71yfDXCpBk107Emx8ZMRdcJbt2LTED7zlUjKvyGum9YyxamSzw1iSHI1AIB8CRMddRTtxal4DH27+Es3EVVLFyVH4RmIAPyHyphxW8ZqOWV3UNlpl1qU4plhWhDdajlam3BUYrQdapQFNi4vUfOlhx1qsjo6LOKGcUCqKklx1qPiceiKzs4CqCSd4A3J8KCTQJrEHtu911GEwzXEJXv3G+GCrAnMqwWMaT58q0eFxd0oDcREeBmCMXWecFlB9qzyjWqsmYCmHxHT58qjM3U60sJU5W+HEsGd/7VE4txJbNssNW2AFIx+KyiJAmsZ2l4vbtoZbM5MxPOueWWvG8cdomO41euvCkjw/mrDgd1rF9LjRzV45q2/wAtD6VgrvGnVzGh306HUVb8E4wXcFzWdWdunV6aH7XLhZrCz3cjsI5kkCflXM3QkRAkkfwK6J2lwTYhEZWzFFIVeZQ6lV/YVjzZBaSIAPrOog9Irry25cdJfC7du0r4i8A6WlUhNviXWkIh6roSfAeNVeO7WY6+xf4jqo2VAFRR0AArQYfg64i1ZUto15y4G4AyIP0Pzq54/hcNhUyIo1ERz8STWLXbHHpneB8de8pS9DukMC25WYJ9wPWthhbSuo0XXoPYdNq5vgHtpiAyPOdWQLHNl0B9QK2vYtnuEsR3FMTynoKx9W60e7TYNbSKYjU7aciT+gqDwbAhnBOiiCemwMe4H+a1fa+2GtINIz6+WRifYVk8JjcrNrpnHhBDq2nQELpW3N0KyIQZfoTTLuDImm+GYsOg8RI/ePrpTOJJnT5/XnS1ZDePwiuuWJ+utZPH9mUZtso/pmfmZrY2sYvOm8VcQ6jeksNMBi8BZw8MqAMNjz9T61QY+yjuXGWSSeYIJ3IGx61veKcOS8DOlY/F8EyHRia1KXFlMXbyuYUjXTxFHh7TsdjWlscEZzzIq+4b2eg6jxrXKM8azPB+CNdvWrZ0zuqk9ATqflR9p8SC7Ij5kQlARtlUwI+VdJXhgTI6AZkIaBuQN65Dj+HvavvZgmGOURqybqQOcryHOelSd0vTVdhsaRcS2dBkaNOcg6mfOt89YnsLgQWW4IPdPmPqPet0y1qOeSOy0y61JcUywqiJcFRiKl3BUUig3y2EnanfhJ0rIv2oA51Eu9rPGvNzn6dONbmEpLWkP+TWE/8A2lfzRVjgOPB/xVeZxrVhEHL51jO3XFLc2rAu5LiEXsuUMrKCVVSfw667ax0mrw8RBB740Fcp7W4xruKcKwcIEQlTIzCWPyzQfEVqXfhrXrrnAcOyWlDMpnXugAa68vOrW84UVguzDOyIWJBAiJNXfFcawAB1qTLUW47qxtYqWmdBS8fxhLaTOtZXE8VCDU1QcVxz3AQh3qTK/DiR2i7Usz90zFZPE4ouc7nf2qxsdm8S5kIfPlVgexdwLLwvrB/itSSDK4nGqrwQTKjX50eD4kpaFkbRPOrK/wBiLrTkdT4N/I/imbfYLGNsqf8Amf8A1resbPWd5bXvDuPFIDTVhxO7aujMvduRPQOPHq1VNnsLxAD7ttwP64b0kRSRZew4t4m2yaypccx+VhofQ1z1cW+qt+zt/Kz2p7zDNb/3ACR60x2nsvdtrdEkBirj8rdDUDEhkcFTqpDIeq7j+PStpwZ7GIX4kwWEOh2LRBJFLO28cunJBhWVw5EQQR6Ga6l2O4uiWLVuBmYuxj/ed/GI+VMce4FhiCEYox+6QZXyIP8ANVfCuHtYcZo37sEHkZ29KWrqND24xsJbC75mbyOXQ/XWsPZxRaY8PI8hvvGlW/a/FAkKDqF0HidT+nvWXwzc/X68K1JuOV6rpvAbyle6x22MwPAepNT8RekTPp4zpWK4LxGCon7yaxoZgHXy1rQpigwiPGeusTp5VmtYixF0g1Au4s9T+op3FnfqarXXXU+lZjayV3YHX68hTJwpmSaXhzlAnelPitJmthr4wTfb62o7faRA4WNT06dKz/FeIb61J7IJbDF7gBY6y0Qq7aTSbS1vsDilcaBlnYkftVH2u7Ni4ueO+gY23Ux3twrSPulgDPL1NHj+2eGs91Zc9dAvoOdQMX27DWjABzCNpq7ZT+yXDzbtS0gsT3SCMsmYq7aq7s1jRew6vIOpUjmCI0PhqKsmFdJ445emWWmXFSWFMOKqIl0VFqZcFRSKDnBxjtzpBdz+Kl4TCO5i2jueiKzn/iK0OB7CY+7thyg63GVPac3tWeM/TW2YYn8xoJedTKuQfOuiYX7KMQ3/AHMRbTqFVrh98tX3D/srwqEG69y6ekhE+S97/lV4pycxw/aC8BlaCTsedSP/AMbjL8m3gyGzZv8ATQg6gQzgmZaCZ0nXTSu68N4Lh8OIs2Et+KqMx823PzqjxqjBY04rIBZxKhcTdZoFt7Sn4TMJgKw7pMbxtzTCJyrB8KbiVkd/A32AG+U/oNTTHFu13dyujI43VwVYdJDQRXacTiktoXd1RFEs7EKoHUk6VluD2v8ArsS2NuIwsorWcMjqMrqxDPiIbk8AL/SJ56S/5xZnXFcTxh7hkml2uIsBXe8b2SwN77+Esz+ZUCN/5JB96oMX9lOCcyj3rfgrhh/zUn3pwhzc6w3aa6mgYgUMd2muOR3zEbCt5f8As24fh1a9fv3vhqJYu6qsTGpRA3ONDOtc77e3ME91F4cgVAkuyi4mZzGUAPGgUAyBrmqcI1MkjC9rCm6CrPD9uWAMDWVGvQkAx6fuaxPDuz+JvwbNq84JIzIjlJG4zRlHqa0a/Z3jUtm7eBRADKZle4NDBIUlQNuZ8Yq/jhy16sF7dXWMFhzIjw2HtV/huKpicPGIZHDKDlKkETqIadx1ArkWNS5aYq4HnGnoaTY4pcUQu3TUgeXSs3/O/GpnPrb4nhtxdVh0TNDB1nJE6qSDIjkP1qvTFPYYuh3+8OviPGs+vF3JGYsoJExqI56VqMIFuJ3SDpy10rPGydxrljv/AJPW+0qOf9T1FOWeLW7lzKikBRPnJqhv4PWl4dchzDpFNQ5U7xrEBngajNH81XK8R019iP4FJe7Jmecj1606BEHlr46EgfzW50572lLcyuI8B7D9Zq74fxGJk8/+I0AA8hWauOAwMeXnpFSbF3UcoknxMf39qzY1K1xult/KPrfenEsj72nWs6vETM9OnlFWFniAKgTz9thWdNck/EPGwB+vKqzF3zGgqQ93Nz2+taj31AEk+cikW1SDCNdfLynU/tUnivBryR8JgVyjSYI/mnLfEERTlifPWdYqFj+MM4jTaBzPrW5Kxcopjwh2fKDnc8hz8BV7wbsu9y9/0zsUKgPcgTlDKpgk/iIYaeNVGAxDK6lGhpnnpz/mtp2M7Tst27ZuZCbrybmSXLgZFBIOogeMT41q7YljY8O4amHQW7YhRuTqSepNSGpZpJrTJtqZcU81MtQRblRjUq5UUig6dYsogyoiqOigKPkKcmkzQmqyVQopoiaA5pjGYZLqNbuKrqwhlcBlI8QaeoqDNjsNgs2ZrbsASQr3bj2wCZKhC2XLPKK0qQBAEAaADSANqTNHNAqaMGkTQmgY4ngkxFt7N1cyMIYSRzkQRqCCAZHSqPCdh+H29sMjf/IWu+zkitCWptmoFpCgKoCgaAAAADoANqBemi1JzUGL7X9iUvBnsqATqyDY+KdD4f4PGsfw82HKEn133g6eelemC1YH7T+BW3tf9SEi4kBmGmZSY7/WORptY5C1tSPrSlYe+9hpQ6Hkdj/B8aU1sgSKXZXPMjTxIAmCRJOw0JJ6KaL4s7V8Xe8vqDuvmP3/AMUnilwIoUb1BWyU7wJBEmYykQCTI/2lZHV1XU6UjE3jc7pgOCRGykjQgflPgdPLas8O9xrl1pHa4RHr86ctYkz9aePvTL6HXQ66cxoN/SaGXSBzZT7mPePkKtiJdxxpp0jy0+vWn7DgnUwBp7zVejlue2ntAgelPYZiCZEj6/YVmxZVmLvPwPL80aUdh4MNty8YqMX08SKZuXPbb9KzprbS4W/I3qr41xERlHLaPl/NRrOJYLvrH1+9Vxtl2jl/n+aTHvZb1ozdxOwnp4xpTdu8AdifMHWtTgeHIokx8v5pOJxVtD9xfTQ+1a5ExZ/A4kqylSNDOokeRq4v5LeJR7IYA5DB1h+6WAYcsxI11061J4cuGxDfDchGJ7jEgEE7DNt6GkYvh74bF27DmSjpHPMjBWDeccuo502ZTUdYQEABjJ60Go1iBG3KiatOZpjTDtTrmo9ygQ9MU6xpgmg6dQpNCqyVNFNJmioFzRTSaE0Bk0JopoTQKmiJpM0RNUAmkE0ZNINQAmkzQJojQCagcfw3xMNdT8yMB5xpU+aK8kow8KK4NbwkKUYbT5g1Fe1lEaDx3G86jzAJ65UXXWtNxlJuuIg5o6+9QkwM8q48tV147ihLEaajblmYQTz5sGb1dyfwVGZQ2kDSAsHlMKoJG3dyidIDsdTV1jOHZdJ9NjGo0PLQxPKWO9U9+3ry6mdAdP0IExyRQN2rrjltzymkdwQBmll0yuPvDmvPURDZSdAw2mkuMoDAgg6BhqOUzOubfQ+FPZo8B4iejEsOesMR1yLypKoQZt9R3D3gdYA/qMlVnctmiAK0htLLawD3RLGNh1bpqR6xTgcCBMiBtudNfWn+EcQFq4txVzKZW5baGz220dVn72hkTroN6m9puz5sFbto58NcANp94zDNkc+UkE7gdQali7Vr3srROmwjxM0lTPP63qKRP7n62NOWn8NPrSpxXazsWS0LBiptnhzDUCoeBxcaT9b1c2OILoTHM68jGlc7tuaMX7TqOdZ7Hkjf3rYNxRCQseLHx8Byqs4jkeQonaPE9DTH0viq4bhBdyjbQL3dSSeRHnrPjWixWHZsTYR2LOptJm/EckT6qpUeSVL7L8ORFuu6x8NZE6zHIHn976mp3Y3DI7PiW7zZjlOkAFjMDcE8/Ste1j418RSHNKLU05rSEOaZcU4xppjQNNTBNO3GqMWoOoTRzSaFVkdJNHQIoEzQo6I1QKFChRRURozSaIBpBpRpBqBJNFNGaRRS5oNtFMX8UiCXdUHV2Cj3rMdoO3OGsoy22+LcgwEIKg7SzbegmqM9ct57rsTMu3ykxT3wwtV/BeIpcEK3e5qdG/vV04EV5bvb0zWlFjgCOWbn1/Ws1jcPuY/z/kAnrEVp8cwAnmaoMW+n19c61jWMpKo3MbHQGZ3OmuvUyZ8WcdKQFPoIEA84ykL7rPixqUoTP38wXmUClhvBUHQwev61aHsy7p8TDMt9NiEOS4NPuOjajQKIBJgk867yuVigYBhrHmIGsaTrovjyVBzNb37O+IJdV+G4rvW7gY282nIM6g7hhmDjmNegrDXrJBZXEOCZDAqw5nMrfdGmbUbACkWMS9tg6tkZTmUwAVYHMPOCZj8xA5VUWva3s2+Cv/BYllfW28QHU6TO2YR3unkRVLdYRIPPl9df0ruGGezxnAw+VXGhkSbd8DvdDl8jqDyImuMcYwT4e49l1KMjQyk7dCrfiUzIPQ0ioaPB0M+EGRp8vepK4kz5CJ/qI/mo9oTrH60dzQACZ8oHz5/4qaNpWHvaEz9bT7+1OpicpmPH2Me2seNVr3eWw6/XnUpFBUQNzzk/iG/hlPKpYbal+LlsK9toBc21EDUjOM36A69K1PZ7BqFUg6AEKFJCkgwTG38ya5vYTNlQAxqxO0iPw9dP3rpvAbn+kkkaAbdMsSJ9Kn0q4ppjSi1NsaoSxppzRsabc1QxcamDT1yo5oOpg0dJFGDVZHQmimiJoDoiaFCgFA0KI0BE0mjNRsbjEtIXuOqKN2YgCoHzUHinFLOHXPedUHidT5AamsLx77RZlMIsAaG84/8AonM+dc34jxK5eYuxZyfxMZJ+vlV0rf8AHPtNIJXDWwByd9SfEINvU1isb2vxl0nPiHAP4UORf+EVU3UBAInNzB5eINNZD0q6FriLXxLefQuN5MsR5mq+x3gQTDD3FHh7zLIjQiKD2j94aGqqRhrDEnUd0ZpnlMT151aYXjd233S+ZejyffcVQ2r+86HbMN/UU3dtvuDK9V/fpUuO/TdjWNxhH+8cp2jcfOmLxBG9Z/4gyqoBLGf80jDG7lLqe7my6ndomAPIfpXO4T41yv1Ixg6cjTWDx72XD2nKN1B0I6MDoR4Gm795h96J8DrTJcGrrSOgYLtXh8Sot460gaIDkdz0b7yajrHjSsf2LRxnw92OYDnOvgVcajdiJDSSCTpWAR95qx4Zxy/hz3GlZko2qmTJgcj5UNNR2Vxt7hmIBvqUsPCO33ra8kZWEg5SwEbxmJrZ/aR2UGMtfGtAG/bXSP8A+iblPE818dOdYvB9prV7R5tudCCe6fCTow8DXQeyXEGdfhwhRE7p+5CiIWBp4CAIFPE08/29Cdwflr0O3jSAZ9emlehbfA8KjOy2EZ3aWZ0V2JPiw+t96C8Mw1hs6Ye0tw/iVFBHyGlZ/JGpi8/mw6iWRhPMqwH6VLwdm45GRHbUfcRm5RuBXaMTxFi8FCVI3ANQcfeaCUYiNwdNOtZ/J/GuDnmA4ddZ1X4VwazLIymI8R1j6FdG4VhzbQIIgaa76EwD1/vVDd42U1dwI11NOdnePC/eKExKsVn8RUFo8CRNJnv4lxaiaQxog1JY10YJY00xpw001UNXKjk07cNRyag6kDSwaZBpQNVk5NCiBo6oFChQoBUbGYtLSF7jqiKJLMQAKyvar7QMNhJRCL14fgQ91T/W428t65DxvtBiMa+fEOWEyiDuovSF/c61dLp0HtD9qAkpgkDRobrghR4ou59fesBj+IXL7fExFx7h5Zj7IuyjxioWWN/QDQDzpJBY00DuXC5ygQOg6U5gMOHYqMoIIgmfUVKw+Fgaio+HXLdMbjUehmqpeKTIzKRrOp025R6U2pU6DfpE1ZcRthwHHTXy601aPfKDQLv1IjepBHUVJs2w1NYmc1P4UECdx9bVRHvcOEkqdT+E/tVbfUoCw0NaMwdRyE1X463n7rAROh50FHZvZnAI1nVl0Mc9NjVnxh1tIlm22Y6uzRGraDy2PtVfdsG2c3LUVHuKTqTJ8fapUNFid6OiK0dAA5pYvGm6MCppdpNplY6ztpHM8q672C4C+HT4l6fiOO6p3toeRP5jpPSI61Sdg+yRUriL6d7dEb8PR2HXoOVdBe5Agb9a455b6jpjj+y794J4tUIn8TGiv3EQZmInxqva67nuKY6n9q5VqRPONLMAFhB8zVXexLfEZWSEbbpU1cFl7124RHIGKrOM8UthCFbY6VdL0h8VRLMNlQT1UTVbhOJ4ZXV8ltXUyGVQCD10qbcZL6pnQOYgTPyFVDNg5ZXs5WWZEsNfIGrobZbi5EfOsXAcuvMGCNeex9aURWc4bYtXsMURyLXxQ5UmXR1VhKNMrIPjMRTvBrl1HZHdblnXI8gOpH4XX+NJHKYHXHLrtyyl30vDTL0v4qnYg005rUZMXKjmnrhqOaDqANLBpsGlCqyWDSgap+N9ocNhFzX7qqeSDvO3+1Rqa5f2g+0/EXSVwy/BT8xAe43jr3V96smx1fjfHbGEt/EvuFHIbux6Iu5Nca7V/aLiMVKWpsWjyU/6jD+tht5D51kcfjbl5y913d/zOST5DoPKmrFssasijtr/AGqZbBXzO/WkqAu2/M/xSkWaoUqljA3qxw9kJuJNRkYD7qyep0FWGGsAaka/KipCD82lV1+3kuh/wnQnpOmvhVhJHlVZxB5YAdeVEO/FyynQkelMhirrc/DojnoPwk/p6UrFplOm0CPlS8CQSUbZgRUU41sM518po3Rhz94qvL5GyOdtFf8AQN1FSnBiD4QdwRVQSXmD6mQfrSpbgHWJqsd+8an2X7s+FBU8VQ5tdtP5FQ3OkHWNuoq6u4YdJDaMOp5EeNVOLsZCV6bHqOXryoIbCDSDVpgeF3L7Bbalid+g8zyrfcE+z+0gzYhi7fkGiDz5tXPLKRZja5nhcK9xsqKWYxoBJrp/ZPsclgC7iAGubhd1T/2bxrU4LhtqyItW0Qf0jX1NLxBQDV65ZZ3Lp0mMgr+OVBv6c6jpfd/uiF6n9qg/9UoblPXemcVjEP3rp8hoKxptarhkLS5zGlYriAQQsAVm7vHEQQpnzqhxnGC53qzFm1b8U4wWnWslxDFsx0ml3sZO2pp7A8PZlN917ls95iY13AUbk1uST1N2+JXZ7HOmUhcxUkx4DQzVLxrFM953YQzMTlXX0EU5gcayN8USS2YNGwzGSB6wacwN3Jfa8y62wWUMJBbZZ5HUitXqk1YrrPFWVWQMQGEERV12cxGKJLYdC6jQzATXrmIB9KqOKYZVeRsdfnrXTuzygYa1H5J9SavV+JdxWPxQWyrYq21hkmGQF7TZhrOXMFPTY9KuWcEAgyCAQYI0InZgD8xTl5QQQQCDuDqD5io7mmM14xct+mrjVHLUu4aYJrQ3nGO0eGwom9cAaNEHedvJRr+1c5479o+JuymHHwE/No10jz+6npPnQoVqIw1+XYu7MzE6sxLMfMmm2snrQoVQlLfjp9bU/MaDaioUUKkJGWPflRUKCdhklhAJ6mp7NAoUKBPxOVVrr/qgH0oUKCbihPKoVqQwj706f3oqFEIxeVncMwJzaRyo+H4og5G1108KFCgc4lhiDmGxOv7UeDeJU+9ChQP2cPevNlsoSPzHQVpeG9jRH+u+Y/lXQeU0KFefPOumOMa7h3DUtrlRAo8P361O+GAPGhQrlGkHF4iOdZbit3cljQoVRmX4rlbemHx2bUmhQrrJGarsRmmZ0oWlY6CaFCtfGfqxXJZIzQ7zqIlV/wB3XyrVY/DqmEOKQkMXV2QQbTAyjZBusZiMpJjNoegoVid5RvepdMUoFu5A/wC3cAdCdY1MT4qQQfKn71zMxXLGUKImQYH3h1nUz40KFdrJtz+JXEMKtxLFwKNB8N+UlT3Z8Y/SrrgXH8sWX2XQHp4GjoVlfjSMwIkGRUa4aFCiIlx6jZqFCqP/2Q==',1),(8,'Hot shave','Wet clean shave with hot towel and various clensing products.','Any','15','4','https://nextluxury.com/wp-content/uploads/Wet-Shaving-Tips-For-Men.jpg',0);
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
INSERT INTO `staff` VALUES (1,'John','Smith','Owner'),(2,'Jane','Doe','Barber');
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin@test.com','test1',NULL,1),(41,'kieran@test.com','test',41,NULL),(42,'jason@test.com','test2',42,NULL),(43,'james@test.com','test3',43,NULL);
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

-- Dump completed on 2022-05-23 23:10:27
