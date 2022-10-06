-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: newhome_db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Televisores','2022-10-04 16:39:30',NULL,NULL),(2,'Consolas','2022-10-04 16:39:30',NULL,NULL),(3,'Audio','2022-10-04 16:39:30',NULL,NULL),(4,'Celulares','2022-10-04 16:39:30',NULL,NULL),(5,'Electrodomesticos','2022-10-04 16:39:30',NULL,NULL),(6,'Muebles','2022-10-04 16:39:30',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'secarropas.jpg',1,'2022-10-04 16:39:30',NULL,NULL),(2,'heladera.jpg',2,'2022-10-04 16:39:30',NULL,NULL),(3,'lavarropas2.jpg',3,'2022-10-04 16:39:30',NULL,NULL),(4,'ropero.jpg',4,'2022-10-04 16:39:30',NULL,NULL),(5,'ventilador.jpg',5,'2022-10-04 16:39:30',NULL,NULL),(6,'colchon.jpg',6,'2022-10-04 16:39:30',NULL,NULL),(7,'cocina.jpg',7,'2022-10-04 16:39:30',NULL,NULL),(8,'tostadora.png',8,'2022-10-04 16:39:30',NULL,NULL),(9,'inodoro.jpg',9,'2022-10-04 16:39:30',NULL,NULL),(10,'tacho.jpg',10,'2022-10-04 16:39:30',NULL,NULL),(11,'sillon.jpg',11,'2022-10-04 16:39:30',NULL,NULL),(12,'tv1.jpg',12,'2022-10-04 16:39:30',NULL,NULL),(13,'product-1662078677579.jpg',13,'2022-10-04 16:39:30',NULL,NULL),(14,'product-1662143951330.jpg',14,'2022-10-04 16:39:30',NULL,NULL),(15,'product-1664902113398.jpg',15,'2022-10-04 16:48:33','2022-10-04 16:48:33',NULL),(16,'product-1664902160715.jpg',16,'2022-10-04 16:49:20','2022-10-04 16:49:20',NULL),(17,'product-1664902550622.jpg',17,'2022-10-04 16:55:50','2022-10-04 16:55:50',NULL),(18,'product-1664904166179.jpg',18,'2022-10-04 17:22:46','2022-10-04 17:22:46',NULL),(19,'product-1664904278499.jpg',19,'2022-10-04 17:24:38','2022-10-04 17:24:38',NULL),(20,'product-1664904378016.jpg',20,'2022-10-04 17:26:18','2022-10-04 17:26:18',NULL),(21,'product-1664948893094.jpg',21,'2022-10-05 05:48:14','2022-10-05 05:48:14',NULL),(22,'product-1664949070385.jpg',22,'2022-10-05 05:51:10','2022-10-05 05:51:10',NULL),(23,'product-1664951388638.jpg',23,'2022-10-05 06:29:49','2022-10-05 06:29:49',NULL);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `total` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `description` text,
  `categoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Secarropas centrífugo Koh-i-noor',35999,10,'lorem ipsum dolor amet sit.',5,'2022-10-04 16:39:30',NULL,NULL),(2,'Heladera inverter no frost Samsung',158190,15,'lorem ipsum dolor amet sit.',5,'2022-10-04 16:39:30',NULL,NULL),(3,'Lavarropas automático Whirlpool',100499,20,'lorem ipsum dolor amet sit.',5,'2022-10-04 16:39:30',NULL,NULL),(4,'Ropero de madera',45065,10,'lorem ipsum dolor amet sit.',6,'2022-10-04 16:39:30',NULL,NULL),(5,'Ventilador de techo Liliana',44899,15,'lorem ipsum dolor amet sit.',5,'2022-10-04 16:39:30',NULL,NULL),(6,'Colchón 2 plaza de espuma',47599,20,'lorem ipsum dolor amet sit.',6,'2022-10-04 16:39:30',NULL,NULL),(7,'Cocina Electrolux',189799,30,'lorem ipsum dolor amet sit.',5,'2022-10-04 16:39:30',NULL,NULL),(8,'Tostadora Moulinex Vita',7590,35,'lorem ipsum dolor amet sit.',5,'2022-10-04 16:39:30',NULL,NULL),(9,'Inodoro Prunus One Piece',37012,30,'lorem ipsum dolor amet sit.',5,'2022-10-04 16:39:30',NULL,NULL),(10,'Cesto Tacho Basura Acero Inoxidable Pedal',4990,50,'lorem ipsum dolor amet sit.',6,'2022-10-04 16:39:30',NULL,NULL),(11,'Sillon Capitone Premium',19999,40,'lorem ipsum dolor amet sit.',6,'2022-10-04 16:39:30',NULL,NULL),(12,'Smart TV Samsung',112999,40,'lorem ipsum dolor amet sit.',1,'2022-10-04 16:39:30',NULL,NULL),(13,'Sega genesis',5000,0,'Sega Mega Drive o Sega Genesis es una videoconsola de sobremesa producida por SEGA, lanzada al mercado en 1988. Esta videoconsola es la sucesora directa de la Sega Master System y compitió contra la SNES de Nintendo, como parte de las videoconsolas de cuarta generación.',2,'2022-10-04 16:39:30',NULL,NULL),(14,'Iphone 12',250000,5,'Esta re bueno',4,'2022-10-04 16:39:30',NULL,NULL),(15,'Sony PlayStation 3 Super Slim 500GB Standard color charcoal black',67900,20,'Con tu consola PlayStation 3 tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.',2,'2022-10-04 16:48:33','2022-10-04 16:48:33','2022-10-04 16:48:46'),(16,'Sony PlayStation 3 Super Slim 500GB Standard color charcoal black',67999,15,'Con tu consola PlayStation 3 tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.',2,'2022-10-04 16:49:20','2022-10-04 16:49:20',NULL),(17,'Tcl 10 Se',64999,10,'Fotografía profesional en tu bolsillo\r\nDescubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados.',4,'2022-10-04 16:55:50','2022-10-04 16:55:50','2022-10-04 16:56:09'),(18,'Microsoft Xbox Series X 1TB Standard color negro',199999,5,'Con tu consola Xbox Series tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.\r\n\r\nLa nueva generación de consolas está comandada por la Xbox Series que llegó al mercado para sorprender a todos. Su potencia y alto rendimiento te permitirá reducir las horas de descarga de juegos y contenido de manera considerable en comparación con otras consolas. Además, vas a poder jugar durante horas mientras te divertís con jugadores de todo el mundo.',2,'2022-10-04 17:22:46','2022-10-04 17:22:46',NULL),(19,'Smart TV LG AI ThinQ 43UP7750PSB LCD 4K 43\" 100V/240V',113999,20,'LG es innovación y eso se ve en cada uno de sus productos tecnológicos, pensados especialmente para que tu familia y vos disfruten mucho más de la vida. Tener un televisor LG es aprovechar la más alta calidad del mercado.\r\nCon el Smart TV 43UP7750 vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.',1,'2022-10-04 17:24:38','2022-10-04 17:24:38',NULL),(20,'Smart TV Philips 6600 Series 50PUD6654/77 LED 4K 50\" 110V/240V',129113,25,'El compromiso de Philips es brindar nuevas e innovadoras tecnologías. Es por esa razón que se centra en los detalles para poder ofrecer productos que marcan la diferencia y crean una experiencia visual más increíble y auténtica.\r\nCon el Smart TV 50PUD6654 vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.',1,'2022-10-04 17:26:18','2022-10-04 17:26:18',NULL),(21,'Microsoft Xbox One S 1TB Bundle color gradiente',149999,15,'    Con tu consola Xbox Onetendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.',2,'2022-10-05 05:48:13','2022-10-06 16:48:03',NULL),(22,'Lavavajillas Drean Dish 15.2 DT de 15 cubiertos blanco 220V',115999,25,'Con el lavaplatos Drean Dish 15.2 DT te olvidás de la higiene de tu cocina. Su gran capacidad permite lavar toda la vajilla de manera rápida y práctica. Cuenta con inicio diferido en el que podés seleccionar el momento de inicio del lavado con 23h de anticipación. Además, gracias a la composición de sus materiales y tecnología produce bajo ruido.',5,'2022-10-05 05:51:10','2022-10-05 05:51:10',NULL),(23,'Smart TV LG AI ThinQ 43UP7750PSB LCD 4K 43\" 100V/240V',59999,40,'LG es innovación y eso se ve en cada uno de sus productos tecnológicos, pensados especialmente para que tu familia y vos disfruten mucho más de la vida. Tener un televisor LG es aprovechar la más alta calidad del mercado.\r\nCon el Smart TV 43UP7750 vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.',1,'2022-10-05 06:29:48','2022-10-05 06:29:48',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'admin','2022-10-04 16:39:30',NULL,NULL),(2,'user','2022-10-04 16:39:30',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220930123725-create-category.js'),('20220930123800-create-rol.js'),('20220930125140-create-product.js'),('20220930125804-create-image.js'),('20220930130033-create-user.js'),('20220930130402-create-address.js'),('20220930130946-create-order.js'),('20220930130953-create-cart.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `rolId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@gmail.com','$2a$10$CAtEJ5Hr/3kmyTxSDjlVxOrQGv4zKlCbRHU1Wm8pPJPpOaK9wRRCa',NULL,1,'2022-10-04 16:39:30',NULL,NULL),(2,'user','user','user@gmail.com','$2a$10$7tSR1tIZFSmDXU6aq2YVfeENlI.9t2QoQ6Dsj1PIEyhebWlNhJQwC',NULL,2,'2022-10-04 16:39:30',NULL,NULL);
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

-- Dump completed on 2022-10-06 14:14:00
