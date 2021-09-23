-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.6.3-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- seeulater 데이터베이스 구조 내보내기
DROP DATABASE IF EXISTS `seeulater`;
CREATE DATABASE IF NOT EXISTS `seeulater` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `seeulater`;

-- 테이블 seeulater.urls 구조 내보내기
DROP TABLE IF EXISTS `urls`;
CREATE TABLE IF NOT EXISTS `urls` (
  `url_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `url` text NOT NULL,
  `description` text DEFAULT NULL,
  `memo` text DEFAULT NULL,
  `directory` int(11) DEFAULT NULL,
  `regdate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deldate` datetime DEFAULT NULL,
  `read` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`url_id`),
  KEY `urls_FK` (`user_id`),
  CONSTRAINT `urls_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 seeulater.urls:~5 rows (대략적) 내보내기
DELETE FROM `urls`;
/*!40000 ALTER TABLE `urls` DISABLE KEYS */;
INSERT INTO `urls` (`url_id`, `user_id`, `url`, `description`, `memo`, `directory`, `regdate`, `deldate`, `read`) VALUES
	(1, 1, 'https://jayhyun-hwang.github.io/', NULL, NULL, NULL, '2021-09-21 01:23:41', NULL, 0),
	(2, 1, 'https://github.com/jayhyun-hwang', NULL, NULL, NULL, '2021-09-21 01:30:19', NULL, 0),
	(3, 1, '//localhost:3000/', NULL, NULL, NULL, '2021-09-21 03:17:04', NULL, 0),
	(4, 1, 'https://www.baeldung.com/cs/', NULL, NULL, NULL, '2021-09-21 17:01:23', NULL, 0),
	(5, 1, 'http://www.danawa.com/', NULL, NULL, NULL, '2021-09-21 17:04:11', '2021-09-21 17:43:32', 0);
/*!40000 ALTER TABLE `urls` ENABLE KEYS */;

-- 테이블 seeulater.users 구조 내보내기
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 seeulater.users:~1 rows (대략적) 내보내기
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `id`, `password`) VALUES
	(1, 'wogus0501', 'wogus0501');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
