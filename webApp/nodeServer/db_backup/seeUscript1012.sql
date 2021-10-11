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

-- 테이블 seeulater.system_option 구조 내보내기
DROP TABLE IF EXISTS `system_option`;
CREATE TABLE IF NOT EXISTS `system_option` (
  `version` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 seeulater.system_option:~1 rows (대략적) 내보내기
DELETE FROM `system_option`;
/*!40000 ALTER TABLE `system_option` DISABLE KEYS */;
INSERT INTO `system_option` (`version`) VALUES
	(1);
/*!40000 ALTER TABLE `system_option` ENABLE KEYS */;

-- 테이블 seeulater.urls 구조 내보내기
DROP TABLE IF EXISTS `urls`;
CREATE TABLE IF NOT EXISTS `urls` (
  `url_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `url` text NOT NULL,
  `title` text DEFAULT NULL,
  `icon_img` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `memo` text DEFAULT NULL,
  `directory` int(11) DEFAULT NULL,
  `regdate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deldate` datetime DEFAULT NULL,
  `read` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`url_id`),
  KEY `urls_FK` (`user_id`),
  CONSTRAINT `urls_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 seeulater.urls:~87 rows (대략적) 내보내기
DELETE FROM `urls`;
/*!40000 ALTER TABLE `urls` DISABLE KEYS */;
INSERT INTO `urls` (`url_id`, `user_id`, `url`, `title`, `icon_img`, `description`, `memo`, `directory`, `regdate`, `deldate`, `read`) VALUES
	(1, 1, 'https://jayhyun-hwang.github.io/', NULL, NULL, NULL, NULL, NULL, '2021-09-21 01:23:41', '2021-09-27 20:30:40', 0),
	(2, 1, 'https://github.com/jayhyun-hwang', NULL, NULL, NULL, NULL, NULL, '2021-09-21 01:30:19', '2021-09-27 20:30:41', 0),
	(3, 1, '//localhost:3000/', NULL, NULL, NULL, NULL, NULL, '2021-09-21 03:17:04', '2021-09-26 19:13:59', 0),
	(4, 1, 'https://www.baeldung.com/cs/', NULL, NULL, NULL, NULL, NULL, '2021-09-21 17:01:23', '2021-09-26 19:18:03', 0),
	(10, 1, 'https://www.playstation.com/ko-kr/', NULL, NULL, NULL, NULL, NULL, '2021-09-23 22:38:59', '2021-09-26 19:15:50', 0),
	(11, 1, 'http://golang.site/', NULL, NULL, NULL, NULL, NULL, '2021-09-23 22:39:13', '2021-09-26 19:17:10', 0),
	(12, 1, 'https://stackoverflow.com/questions/3833561/why-doesnt-git-ignore-my-specified-file/3833675', NULL, NULL, NULL, NULL, NULL, '2021-09-23 22:39:21', '2021-09-26 19:11:10', 0),
	(13, 1, 'https://store.playstation.com/ko-kr/category/c4113150-fbb2-40ae-8fe8-55cd9c089cd8/1', NULL, NULL, NULL, NULL, NULL, '2021-09-23 22:39:29', '2021-09-26 19:10:40', 0),
	(14, 1, 'https://store.playstation.com/ko-kr/category/c4113150-fbb2-40ae-8fe8-55cd9c089cd8/1', NULL, NULL, NULL, NULL, NULL, '2021-09-23 22:39:38', '2021-09-26 19:09:49', 0),
	(16, 1, 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send', NULL, NULL, NULL, NULL, NULL, '2021-09-27 00:35:32', '2021-09-27 01:50:24', 0),
	(17, 1, 'https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express', NULL, NULL, NULL, NULL, NULL, '2021-09-27 01:40:46', '2021-09-27 01:50:23', 0),
	(18, 1, 'https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 01:45:35', '2021-09-27 01:50:21', 0),
	(19, 1, 'https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest', NULL, NULL, NULL, NULL, NULL, '2021-09-27 01:47:23', '2021-09-27 01:50:18', 0),
	(20, 1, 'https://multifrontgarden.tistory.com/191', NULL, NULL, NULL, NULL, NULL, '2021-09-27 01:47:38', '2021-09-27 01:50:14', 0),
	(21, 1, 'https://www.youtube.com/watch?v=glXgSSOKlls', NULL, NULL, NULL, NULL, NULL, '2021-09-27 01:49:35', '2021-09-27 01:50:17', 0),
	(22, 1, 'http://localhost:3000/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 02:05:46', '2021-09-27 09:12:02', 0),
	(23, 1, 'https://madplay.github.io/post/coupling-and-cohesion-in-software-engineering', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:03:54', NULL, 0),
	(24, 1, 'http://cloudrain21.com/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:00', NULL, 0),
	(25, 1, 'http://cloudrain21.com/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:04', NULL, 0),
	(26, 1, 'http://cloudrain21.com/essence-of-object-orientation', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:08', NULL, 0),
	(27, 1, 'https://real-dongsoo7.tistory.com/70', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:12', NULL, 0),
	(28, 1, 'https://velog.io/@design0728/브라우저-저장소-LocalStorage-SessionStorage-Cookie', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:19', NULL, 0),
	(29, 1, 'https://stackoverflow.com/questions/9835974/use-of-globalstorage-is-deprecated-please-use-localstorage-instead', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:24', NULL, 0),
	(30, 1, 'https://jsqna.com/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:30', NULL, 0),
	(31, 1, 'https://jsqna.com/ejs-1-why-express-2/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:35', NULL, 0),
	(32, 1, 'https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:39', NULL, 0),
	(33, 1, 'https://blog.logrocket.com/creating-a-crud-api-with-node-express-and-grpc/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:47', NULL, 0),
	(34, 1, 'https://tomining.tistory.com/174', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:51', NULL, 0),
	(35, 1, 'https://ithub.tistory.com/32', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:04:55', NULL, 0),
	(36, 1, 'https://superuser.com/questions/1020821/how-can-i-create-a-symbolic-link-on-windows-10', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:01', NULL, 0),
	(37, 1, 'https://ocsusu.tistory.com/60', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:19', NULL, 0),
	(38, 1, 'https://www.extrahop.com/company/blog/2018/tcp-vs-http-differences-explained/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:34', NULL, 0),
	(39, 1, 'https://velog.io/@sdc337dc/웹-개념-Http-통신', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:38', NULL, 0),
	(40, 1, 'https://ivorycode.tistory.com/entry/HTTP와-HTTPS-그리고-Mixed-Content?category=885826', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:42', NULL, 0),
	(41, 1, 'https://ivorycode.tistory.com/entry/JWTJson-Web-Token', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:46', NULL, 0),
	(42, 1, 'https://mangkyu.tistory.com/56', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:51', NULL, 0),
	(43, 1, 'https://code-machina.github.io/2019/09/01/Security-On-JSON-Web-Token.html', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:05:56', NULL, 0),
	(44, 1, 'https://www.geeksforgeeks.org/main-and-init-function-in-golang/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:01', NULL, 0),
	(45, 1, 'https://velog.io/@shg4821/깃허브-블로그-만들기-1.5', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:05', NULL, 0),
	(46, 1, 'https://nodejs.org/ko/docs/guides/blocking-vs-non-blocking/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:09', NULL, 0),
	(47, 1, 'https://m.blog.naver.com/pjt3591oo/221452097691', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:18', NULL, 0),
	(48, 1, 'https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pjt3591oo&logNo=221598199432', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:29', NULL, 0),
	(49, 1, 'https://hamait.tistory.com/1031?category=250996', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:38', NULL, 0),
	(50, 1, 'https://hamait.tistory.com/1027?category=250996', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:45', NULL, 0),
	(51, 1, 'https://hamait.tistory.com/1022?category=250996', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:06:55', '2021-09-27 09:07:04', 0),
	(52, 1, 'https://hamait.tistory.com/1027?category=250996', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:07:22', '2021-09-27 09:07:37', 0),
	(53, 1, 'https://hamait.tistory.com/1022?category=250996', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:07:29', NULL, 0),
	(54, 1, 'https://hamait.tistory.com/1065?category=250996', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:08:06', NULL, 0),
	(55, 1, 'https://hamait.tistory.com/1049?category=250996', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:08:16', NULL, 0),
	(56, 1, 'https://stackoverflow.com/questions/23542989/pointers-vs-values-in-parameters-and-return-values', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:08:24', NULL, 0),
	(57, 1, 'https://hamait.tistory.com/1065', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:08:31', NULL, 0),
	(58, 1, 'https://m.blog.naver.com/PostView.nhn?blogId=gkenq&logNo=10184408275&proxyReferer=https:%2F%2Fwww.google.com%2F', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:08:54', NULL, 0),
	(59, 1, 'https://opensource.fb.com/code-of-conduct/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:09:09', NULL, 0),
	(60, 1, 'https://velog.io/@jakeseo_me/프론트엔드-인터뷰-문제-답해보기-11-클로저는-무엇이며-왜-사용하나요-Execution-Context-Lexical-Environment', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:09:12', NULL, 0),
	(61, 1, 'https://m.blog.naver.com/magnking/220961896609', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:09:16', NULL, 0),
	(62, 1, 'https://kdydesign.github.io/2020/08/28/npm-tutorial/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:09:21', NULL, 0),
	(63, 1, 'https://www.ciokorea.com/tags/124205/하수라(Hasura)/167085', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:09:27', NULL, 0),
	(64, 1, 'https://namu.wiki/w/PostgreSQL', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:09:31', NULL, 0),
	(65, 1, 'https://rastalion.me/postgresql과-mariadb의-사이에서의-선택/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:09:35', NULL, 0),
	(66, 1, 'https://d2.naver.com/helloworld/227936', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:10:01', NULL, 0),
	(67, 1, 'https://hackersstudy.tistory.com/25', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:10:12', NULL, 0),
	(68, 1, 'https://memo.polypia.net/archives/944', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:10:29', NULL, 0),
	(69, 1, 'https://blog.naver.com/yexx/220123571890', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:10:39', NULL, 0),
	(70, 1, 'https://fpem.tistory.com/58', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:10:46', NULL, 0),
	(71, 1, 'https://kldp.org/node/72564', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:10:51', NULL, 0),
	(72, 1, 'https://optimizdba.com/mariadb-vs-postgresql-know-the-difference-between-the-databases﻿/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:11:04', NULL, 0),
	(73, 1, 'https://hee96-story.tistory.com/48', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:11:09', NULL, 0),
	(74, 1, 'https://medium.com/@meeusdylan/tail-recursion-in-go-fb5cf69a0f26', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:11:19', NULL, 0),
	(75, 1, 'https://medium.com/@geisonfgfg/functional-go-bc116f4c96a4', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:11:30', NULL, 0),
	(76, 1, 'https://medium.com/@jooyunghan/cps로-스택오버플로-회피하기-11db11eb8d75', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:11:36', NULL, 0),
	(77, 1, 'https://bamdule.tistory.com/62', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:11:42', NULL, 0),
	(78, 1, 'https://medium.com/sjk5766/express-다른-도메인-cookie-공유하기-1587c63ac24a', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:31:41', NULL, 0),
	(79, 1, 'https://brocess.tistory.com/146', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:45:04', NULL, 0),
	(80, 1, 'https://developer.chrome.com/docs/extensions/reference/storage/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 09:54:15', NULL, 0),
	(81, 1, 'https://saas.relate.kr/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 10:04:56', NULL, 0),
	(82, 1, 'http://tcpschool.com/html/html_space_framesIframes', NULL, NULL, NULL, NULL, NULL, '2021-09-27 10:31:57', NULL, 0),
	(84, 1, 'https://nodejs.dev/learn/get-http-request-body-data-using-nodejs', NULL, NULL, NULL, NULL, NULL, '2021-09-27 13:19:34', NULL, 0),
	(85, 1, 'https://developer.chrome.com/docs/webstore/publish/', NULL, NULL, NULL, NULL, NULL, '2021-09-27 15:27:29', NULL, 0),
	(86, 1, 'https://blog.naver.com/varkiry05/221204222494', NULL, NULL, NULL, NULL, NULL, '2021-09-29 01:45:57', '2021-09-29 02:54:35', 0),
	(87, 1, 'https://ko.wikipedia.org/wiki/구문_(프로그래밍_언어)', NULL, NULL, NULL, NULL, NULL, '2021-09-29 02:01:53', '2021-09-29 02:54:27', 0),
	(88, 1, 'https://m.blog.naver.com/varkiry05/221202998292', NULL, NULL, NULL, NULL, NULL, '2021-09-29 02:02:06', '2021-09-29 02:54:37', 0),
	(89, 1, 'https://stackoverflow.com/questions/56758241/node-js-express-how-to-get-data-from-body-form-data-in-post-request', NULL, NULL, NULL, NULL, NULL, '2021-09-29 02:46:47', NULL, 0),
	(90, 1, 'ㅁㄴㅇㄹㅋ', NULL, NULL, NULL, NULL, NULL, '2021-09-29 02:54:42', '2021-09-29 02:55:03', 0),
	(91, 1, 'https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=japkey&logNo=110152091978', NULL, NULL, NULL, NULL, NULL, '2021-09-29 03:40:25', '2021-09-29 03:42:06', 0),
	(92, 1, 'https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=japkey&logNo=110152091978', NULL, NULL, NULL, NULL, NULL, '2021-09-29 03:41:40', '2021-09-29 03:42:03', 0),
	(93, 1, 'https://www.baeldung.com/cs/', NULL, NULL, NULL, NULL, NULL, '2021-09-29 03:47:09', NULL, 0),
	(94, 1, 'https://shortstories.gitbook.io/studybook/', NULL, NULL, NULL, NULL, NULL, '2021-09-29 04:15:38', NULL, 0);
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
