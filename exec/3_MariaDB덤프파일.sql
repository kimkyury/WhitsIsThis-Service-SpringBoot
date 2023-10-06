-- --------------------------------------------------------
-- 호스트:                          j9e203.p.ssafy.io
-- 서버 버전:                        11.1.2-MariaDB-1:11.1.2+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- whatisthis 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `whatisthis` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `whatisthis`;

-- 테이블 whatisthis.banks 구조 내보내기
CREATE TABLE IF NOT EXISTS `banks` (
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `english_name` varchar(255) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.banks:~25 rows (대략적) 내보내기
DELETE FROM `banks`;
INSERT INTO `banks` (`code`, `name`, `english_name`) VALUES
	('02', 'KDB산업은행', 'KDBBANK'),
	('03', 'IBK기업은행', 'IBK'),
	('06', 'KB국민은행', 'KOOKMIN'),
	('07', 'Sh수협은행', 'SUHYEOP'),
	('11', 'NH농협은행', 'NONGHYEOP'),
	('12', '단위농협(지역농축협)', 'LOCALNONGHYEOP'),
	('20', '우리은행', 'WOORI'),
	('23', 'SC제일은행', 'SC'),
	('27', '씨티은행', 'CITI'),
	('31', 'DGB대구은행', 'DAEGUBANK'),
	('32', '부산은행', 'BUSANBANK'),
	('34', '광주은행', 'GWANGJUBANK'),
	('35', '제주은행', 'JEJUBANK'),
	('37', '전북은행', 'JEONBUKBANK'),
	('39', '경남은행', 'KYONGNAMBANK'),
	('45', '새마을금고', 'SAEMAUL'),
	('48', '신협', 'SHINHYEOP'),
	('50', '저축은행중앙회', 'SAVINGBANK'),
	('54', '홍콩상하이은행', 'HSBC'),
	('64', '산림조합', 'SANLIM'),
	('71', '우체국예금보험', 'POST'),
	('81', '하나은행', 'HANA'),
	('88', '신한은행', 'SHINHAN'),
	('90', '카카오뱅크', 'KAKAOBANK'),
	('92', '토스뱅크', 'TOSSBANK');

-- 테이블 whatisthis.damaged_histories 구조 내보내기
CREATE TABLE IF NOT EXISTS `damaged_histories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `history_id` bigint(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_damaged_histories_history_id_from_histories_id` (`history_id`),
  CONSTRAINT `fk_damaged_histories_history_id_from_histories_id` FOREIGN KEY (`history_id`) REFERENCES `histories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.damaged_histories:~16 rows (대략적) 내보내기
DELETE FROM `damaged_histories`;
INSERT INTO `damaged_histories` (`id`, `history_id`, `image_url`, `x`, `y`, `category`) VALUES
	(94, 40, '926b0c93-e03f-4b78-a39b-914ee8206484-drawing.jpg', -9.69, 9.81, 'HOLE'),
	(95, 40, 'd8057461-a072-4f4c-9832-35435a80d7da-drawing.jpg', -9.64, 9.94, 'HOLE'),
	(96, 40, '08caeeec-b82d-46e1-a8ba-01636fa51f7d-drawing.jpg', -9.63, 9.85, 'HOLE'),
	(97, 42, '8adb9443-f10a-45f0-9f16-a692d4e4eb45-drawing.jpg', 156, 166, 'HOLE'),
	(98, 42, 'ff0bc550-4df4-4d66-bd4d-38ad50f45a70-drawing.jpg', 156, 169, 'HOLE'),
	(99, 42, '48730922-cb8b-4e1f-8e15-75ec6ba8e675-drawing.jpg', 157, 168, 'HOLE'),
	(100, 42, '353b75d8-95b0-4cd4-8c46-616735560ff8-drawing.jpg', 155, 165, 'HOLE'),
	(101, 47, '33cb95ab-d533-4788-a6db-45f614d6b0f4-drawing.jpg', 156, 165, 'HOLE'),
	(102, 47, 'd5c2ffa2-23c6-472e-b02a-438573a824da-drawing.jpg', 156, 169, 'HOLE'),
	(103, 47, 'fbe91dac-4396-4d0b-8728-88729c8469f2-drawing.jpg', 156, 177, 'HOLE'),
	(104, 48, '8b3ee159-5a13-4033-ae2e-15f857642da8-drawing.jpg', 156, 165, 'HOLE'),
	(105, 48, 'e7e6c342-8bfb-4905-96d1-1697844298ea-drawing.jpg', 157, 170, 'HOLE'),
	(106, 48, '1f3c11b6-9ec7-422d-9050-7731552ee4d6-drawing.jpg', 155, 176, 'HOLE'),
	(107, 49, 'bea9bd4a-b6f7-469e-8f75-2ff7169a151a-drawing.jpg', 156, 165, 'HOLE'),
	(108, 49, '7f01a897-4c87-4325-8259-0b275bc9527c-drawing.jpg', 157, 170, 'HOLE'),
	(109, 49, 'b3b39527-9edc-477a-a75b-94ff7461c448-drawing.jpg', 155, 176, 'HOLE');

-- 테이블 whatisthis.device_histories 구조 내보내기
CREATE TABLE IF NOT EXISTS `device_histories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `history_id` bigint(20) NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `category` varchar(255) NOT NULL,
  `is_worked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_histories_history_id_from_histories_id` (`history_id`),
  CONSTRAINT `fk_device_histories_history_id_from_histories_id` FOREIGN KEY (`history_id`) REFERENCES `histories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.device_histories:~0 rows (대략적) 내보내기
DELETE FROM `device_histories`;

-- 테이블 whatisthis.histories 구조 내보내기
CREATE TABLE IF NOT EXISTS `histories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `request_id` bigint(20) NOT NULL,
  `report_url` varchar(255) DEFAULT NULL,
  `drawing_url` varchar(255) DEFAULT NULL,
  `zip_url` varchar(255) DEFAULT NULL,
  `inspected_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_histories_request_id_from_requests_id` (`request_id`),
  CONSTRAINT `fk_histories_request_id_from_requests_id` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.histories:~9 rows (대략적) 내보내기
DELETE FROM `histories`;
INSERT INTO `histories` (`id`, `request_id`, `report_url`, `drawing_url`, `zip_url`, `inspected_at`) VALUES
	(10, 126, NULL, NULL, NULL, NULL),
	(40, 122, NULL, '1a57e920-435c-4890-be30-1c076b27ff4f-drawing.jpg', NULL, NULL),
	(42, 127, '47d37eb9-1f2a-4234-a98e-8ea71784b55b-myDocument.pdf', '4c4cad1f-e436-41dd-92e7-1020eb0802fd-drawing.jpg', NULL, '2023-10-05 14:12:18'),
	(43, 125, NULL, '87261505-4f2e-478b-810a-0a9b068d77fc-drawing.jpg', NULL, NULL),
	(44, 124, '079df89f-12bd-4c61-b2cb-ca9102be81b2-myDocument.pdf', NULL, 'd944af5b-9309-44e5-82e1-051cb3831c31-zip.zip', '2023-10-05 14:12:28'),
	(47, 129, 'aa9ba292-5603-433f-bbd2-3aa49435b07f-쿠폰.pdf', 'dc7b23df-0093-425f-b4b0-228d5f9a5d6b-drawing.jpg', 'eaf95028-6aa5-40fd-a416-c319a00ed804-zip.zip', '2023-10-05 14:24:23'),
	(48, 130, '01a7a2b0-2898-42fd-bcb1-4597d22c7329-MO2.png', '1f4c1319-d570-41ac-b940-9d5875bc66e5-drawing.jpg', 'c41ab719-64fa-4d4d-9ecf-89d888f155d3-zip.zip', '2023-10-05 14:24:16'),
	(49, 131, '2de15e40-27bf-4075-b23d-34367968b444-myDocument.pdf', 'b802d9f9-cdad-43e8-9163-ef40aa156e11-drawing.jpg', '711206ab-b0db-4d39-8b8b-af4ef42adbb1-zip.zip', '2023-10-05 14:33:30'),
	(50, 132, 'effd7905-90eb-4c48-a08c-1f0b4d86a69a-myDocument.pdf', NULL, 'da2a849e-e7f9-4313-9ee2-68c7ebd5fc9b-zip.zip', '2023-10-05 14:12:24');

-- 테이블 whatisthis.members 구조 내보내기
CREATE TABLE IF NOT EXISTS `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.members:~16 rows (대략적) 내보내기
DELETE FROM `members`;
INSERT INTO `members` (`id`, `username`, `password`, `name`, `phone`, `role`, `image_url`) VALUES
	(2, '202300000002', '{bcrypt}$2a$10$LnoKb7z37cYAW1mxn7/RFOD7m9D27LnvnPny2FRTCzg0TWppKGmMC', '이도옹옹', '01000000000', 'ROLE_EMPLOYEE', '/img/testImgURL.png'),
	(21, '1234', '{bcrypt}$2a$10$5aI3iYJyycVkACk4m/Fok.7Hj2QT7.kfJAeK.gOGoLsCR71R/vrLm', '이동규', '01066765621', 'ROLE_EMPLOYEE', 'f7aa07ff-e8f9-4c9d-8be6-e3fe4528a05c-흰배경.jpg'),
	(22, '202300000004', '{bcrypt}$2a$10$ucKYh5xMAlYNM9ZAU6zAPOARFyFifBh9ZMZXinmVOXALUWwFUmof6', '신성환', '01000000000', 'ROLE_EMPLOYEE', 'de781146-7d11-43ff-8ede-bae2ef96a9ef-ssh.png'),
	(23, '202300000005', '{bcrypt}$2a$10$QtcwNVgPDkFbOwnhtNDYZura9W7wsZ3lFC1pv2EMjM3djxql9e/4q', '조은정', '01000000000', 'ROLE_EMPLOYEE', 'f7a0bdad-4555-42e1-bfe5-189e9058912a-jej.png'),
	(24, '202300000006', '{bcrypt}$2a$10$F8UaJb3Lz0TpcymbzgjpIetisdAwpTKcsBFs.GTlWPISZhbXbrOgW', '조병철', '01000000000', 'ROLE_EMPLOYEE', '05f90a1a-e971-4075-aa3b-77994a89e109-jbc.png'),
	(25, '202300000007', '{bcrypt}$2a$10$lMtMYja5Mq63xZG/AuZTD.1LQZWYa7ki9OGxLSDIErRy3G5hNEuXG', '홍진환', '12341234123', 'ROLE_EMPLOYEE', '357951ff-9ef2-45ff-99c0-6de2f39058d4-집1.svg'),
	(26, 'aeae2323', '{bcrypt}$2a$10$TvIdAnWNufUfoCdjHe4vJ.7jLLrAKDI7p8BIe0742ChrUmzVDIsjG', '쾅쾅', '01053753537', 'ROLE_EMPLOYEE', 'e1643b16-1749-46a3-9f96-2120d6e0d6a6-KIMKYURIPROFILE.jpg'),
	(27, '202300000009', '{bcrypt}$2a$10$nNiJyPVh74Bt/QNCqICJ9exsPPETPJvMS0pkHDnNlBU.Qmo.ZgRQG', '김보경', '01000000000', 'ROLE_EMPLOYEE', '1c59048d-ade3-484c-95d4-159ebb133ee3-kbk.png'),
	(28, '202300000010', '{bcrypt}$2a$10$tPaqWiXqN.TcXeF5rxfxneYxkTTLMamOSp9p6AsH4vs/vg./q5M1W', '정인모', '01000000000', 'ROLE_EMPLOYEE', '561641d1-4ce7-4fcc-9d32-6a4791a65b21-jim.png'),
	(29, '202300000011', '{bcrypt}$2a$10$oL.Z9I4GoLASrFe1LPiBWuR8a5xb2AvNjXEUPkcwYO.S1VaitjXN6', '최인국', '01000000000', 'ROLE_EMPLOYEE', '0e5c2d6c-262d-4d8b-914e-92011caf7295-cik.png'),
	(35, 'DEVICE1', '{bcrypt}$2a$10$CxMURgE6djviPlXQjla32.UGveTFN6OVZAx3/K4/6ICXz/6rbD6A2', NULL, NULL, 'ROLE_DEVICE', NULL),
	(36, 'DEVICE2', '{bcrypt}$2a$10$cyUU5KWgMJD5fLURZsJKEe7j9EFH77m1eXsjcG5gkid5PfEc3AtDi', NULL, NULL, 'ROLE_DEVICE', NULL),
	(37, 'DEVICE3', '{bcrypt}$2a$10$mJetz7pFC7FD/c4ng1Z3Se8RWg.BKFa31kd.iSydGEaRaq5UByWde', NULL, NULL, 'ROLE_DEVICE', NULL),
	(38, 'DEVICE4', '{bcrypt}$2a$10$/TUNUXfq17o631hg8GAaOeRldkNRXlj3FTIIa7V2q83sCufVZoOdG', NULL, NULL, 'ROLE_DEVICE', NULL),
	(39, 'KYU1', '{bcrypt}$2a$10$Q7cdlK6.6.ZcI9uGKqm9BOASAeUXa2e29MCVvAceGPFDlRqqmEYTm', NULL, NULL, 'ROLE_DEVICE', NULL),
	(40, 'KYU2', '{bcrypt}$2a$10$.46lqP/2JrbGt/vFD2CuRuz/QTdfE3LXjEixF/0rCvbbNsrNmcHgC', NULL, NULL, 'ROLE_DEVICE', NULL);

-- 테이블 whatisthis.payments 구조 내보내기
CREATE TABLE IF NOT EXISTS `payments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `request_id` bigint(20) NOT NULL,
  `virtual_bank_code` varchar(10) DEFAULT NULL,
  `virtual_account` varchar(255) NOT NULL,
  `payment_key` varchar(255) DEFAULT NULL,
  `requested_at` datetime DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `refund_account` varchar(255) DEFAULT NULL,
  `refund_bank_code` varchar(10) DEFAULT NULL,
  `refund_holder_name` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`),
  KEY `fk_payments_virtual_bank_code_from_banks_code` (`virtual_bank_code`),
  KEY `fk_payments_refund_bank_code_from_banks_code` (`refund_bank_code`),
  KEY `fk_payments_request_id_from_requests_id` (`request_id`),
  CONSTRAINT `fk_payments_refund_bank_code_from_banks_code` FOREIGN KEY (`refund_bank_code`) REFERENCES `banks` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_payments_request_id_from_requests_id` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_payments_virtual_bank_code_from_banks_code` FOREIGN KEY (`virtual_bank_code`) REFERENCES `banks` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.payments:~9 rows (대략적) 내보내기
DELETE FROM `payments`;
INSERT INTO `payments` (`id`, `request_id`, `virtual_bank_code`, `virtual_account`, `payment_key`, `requested_at`, `approved_at`, `status`, `refund_account`, `refund_bank_code`, `refund_holder_name`, `order_id`) VALUES
	(24, 122, '03', 'X8011948497814', 'zJ4xY7m0kODnyRpQWGrNbJln7K7nL2rKwv1M9ENjbeoPaZdL', '2023-10-05 02:40:56', NULL, 'DONE', NULL, NULL, NULL, 'f0be617e-6860-4095-a3c4-44471e3ad822'),
	(26, 124, '03', 'X8011948497839', 'evl2J9MNzjkYG57Eba3GpMk5oEKoj5VpWDOxmA1QXRyZ4gLw', '2023-10-05 02:41:31', NULL, 'DONE', NULL, NULL, NULL, '486b4d5e-b4ff-422f-83be-ca835bf8409e'),
	(27, 125, '11', 'X9018612211659', 'gpMwnkjKyO6BYq7GWPVv5YgdQ2YxB43NE5vbo1d4JlALRXxz', '2023-10-05 02:43:00', NULL, 'DONE', NULL, NULL, NULL, 'abfe8508-54e7-4246-9b9f-d20088583e06'),
	(28, 126, '11', 'X9018612211661', 'WkABYDxNyJQbgMGZzorzy4pl59kjyNVl5E1em4dKva7XL9nj', '2023-10-05 02:43:22', NULL, 'DONE', NULL, NULL, NULL, '4891fcb2-ac03-4a4b-b18b-e38335a7c23e'),
	(29, 127, '03', 'X8011948497853', 'lqNRYD097kZLKGPx4M3MnoEAjAjnMEVBaWypv1o6bemnOJz2', '2023-10-05 02:43:54', NULL, 'DONE', NULL, NULL, NULL, '816d42d3-13df-44d4-92b7-d4eee373b17d'),
	(31, 129, '06', 'X6349073302990', 'y05n91dEvLex6BJGQOVD9pxx0Lo6OXrW4w2zNbgaYRMPoqmD', '2023-10-05 06:27:23', NULL, 'DONE', NULL, NULL, NULL, '46330337-7d6a-47ba-aca0-7d8ec7b18ff5'),
	(32, 130, '06', 'X6349073303070', 'gN60L1adJYyZqmkKeP8gNMLO5qEKvYrbQRxB9lG5DnzWE7pM', '2023-10-05 07:24:45', NULL, 'DONE', NULL, NULL, NULL, '31e1f748-9315-4e9c-9678-98571569f2d3'),
	(33, 131, '03', 'X8011948597056', 'OR1ZwdkQD5GePWvyJnrKmvq45R9K113gLzN97EoqYA60XKx4', '2023-10-05 08:01:38', NULL, 'DONE', NULL, NULL, NULL, '67bf8d7d-6d42-44f5-bb75-13074e0676c6'),
	(34, 132, '03', 'X8011948597113', '9o5gEq4k6YZ1aOwX7K8myBYWvbAnGW8yQxzvNPGenpDAlBdb', '2023-10-05 13:31:35', NULL, 'DONE', NULL, NULL, NULL, 'c36c8180-9bf3-4cdb-bdde-ade7bf47117c');

-- 테이블 whatisthis.requests 구조 내보내기
CREATE TABLE IF NOT EXISTS `requests` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `address_detail` varchar(255) NOT NULL,
  `requester_name` varchar(255) NOT NULL,
  `requester_phone` varchar(255) NOT NULL,
  `request_content` varchar(255) DEFAULT NULL,
  `inspection_start` date NOT NULL,
  `inspection_end` date NOT NULL,
  `inspection_date` date DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'WAITING_FOR_PAY',
  `requested_at` datetime NOT NULL DEFAULT sysdate(),
  `warrant_url` varchar(255) DEFAULT NULL,
  `building_area` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_requests_employee_id_from_members_id` (`employee_id`),
  CONSTRAINT `fk_requests_employee_id_from_members_id` FOREIGN KEY (`employee_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.requests:~9 rows (대략적) 내보내기
DELETE FROM `requests`;
INSERT INTO `requests` (`id`, `employee_id`, `address`, `address_detail`, `requester_name`, `requester_phone`, `request_content`, `inspection_start`, `inspection_end`, `inspection_date`, `status`, `requested_at`, `warrant_url`, `building_area`) VALUES
	(122, 23, '부산 강서구 녹산산단335로 7 ', '142342', '신성환', '01099534266', '제발 돼라', '2023-10-05', '2023-10-18', '2023-10-05', 'WAITING_FOR_INSPECTION', '2023-10-05 02:40:56', '9160457b-94dc-4563-8e66-9daea7c3c560-67c64a57-23b1-4679-afa1-c8eef3e7dd42-drawing.png', 432),
	(124, 25, '부산 강서구 송정동 1627-5 ', '112동 123호', '홍진환', '01029903837', '무사히 잘 끝날 수 있길..', '2023-10-05', '2023-10-13', '2023-10-07', 'DONE', '2023-10-05 02:41:31', '5aeb8329-99f1-4de5-89f5-165dfe53e90a-image-_74_.jpg', 1490),
	(125, 23, '울산 중구 유곡로 10 - 선경2차아파트', '102동 1203호', '조병철', '01068711020', '버그없이 무탈하게 해결되길', '2023-10-05', '2023-10-10', '2023-10-05', 'WAITING_FOR_INSPECTION', '2023-10-05 02:42:59', '0f7475e1-3f9e-4e49-b8de-3377b667039c-dog.png', 22.5),
	(126, 26, '부산 강서구 신호산단5로 44-11 ', '수연빌 A동', '깅규리', '01053753537', '바닥이 좀 불안하던데요', '2023-10-05', '2023-10-19', '2023-10-05', 'IN_PROGRESS', '2023-10-05 02:43:22', '0243066b-3687-4abd-8329-c3a1764851b0-1.png', 18.33),
	(127, 23, '부산 강서구 송정동 ', '삼정그린코아 111동1111호', '조은정', '01026760690', '잘해주세요', '2023-10-05', '2023-10-26', '2023-10-05', 'DONE', '2023-10-05 02:43:54', 'f6650b0a-2fbb-4551-8e47-8eefdf822047-New Build on Half-Acre Snapped Up for $8_5M in Sagaponack.jfif', 1233),
	(129, 23, '부산 남구 용소로21번길 133 ', '402호', '홍정현', '01097653145', '깨끗하게봐주세요', '2023-10-05', '2023-10-26', '2023-10-06', 'DONE', '2023-10-05 06:27:23', '0a9488e0-9261-4480-b29f-5c0a56f40d3e-Комната, где все происходит_.jfif', 12345),
	(130, 23, '부산 강서구 녹산산단335로 7 ', '삼정그린코아 123호', '이승민', '01035971081', '확실하게 해', '2023-10-05', '2023-10-19', '2023-10-06', 'DONE', '2023-10-05 07:24:45', 'be5dd7bd-e258-4b6e-bcee-16e00a1d3b63-Комната, где все происходит_.jfif', 123),
	(131, 23, '부산 강서구 명지오션시티2로 71 - 극동 스타클래스', '111- 1104', '정수완', '01026595557', '확실하게 봐주세요', '2023-10-05', '2023-10-19', '2023-10-06', 'DONE', '2023-10-05 08:01:38', 'de4615bf-861d-4ab0-ba13-0c303b0d9af2-Комната, где все происходит_.jfif', 123),
	(132, 21, '부산 사하구 다대로119번길 9 - 효산센터빌아파트', '101동 101', '이동규', '01066765621', 'ㅇㅇ', '2023-10-05', '2023-10-19', '2023-10-06', 'DONE', '2023-10-05 13:31:35', 'bc16c2af-9ba4-455d-97f6-b27dcc46d91e-MO2.png', 40);

-- 테이블 whatisthis.rooms 구조 내보내기
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.rooms:~10 rows (대략적) 내보내기
DELETE FROM `rooms`;
INSERT INTO `rooms` (`id`, `name`) VALUES
	(1, '현관'),
	(2, '거실'),
	(3, '주방'),
	(4, '식당'),
	(5, '욕실'),
	(6, '침실'),
	(7, '베란다'),
	(8, '방'),
	(9, '다용도실'),
	(10, '세탁실');

-- 테이블 whatisthis.todolists 구조 내보내기
CREATE TABLE IF NOT EXISTS `todolists` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `history_id` bigint(20) NOT NULL,
  `todolist_option_id` int(11) NOT NULL,
  `is_checked` tinyint(1) NOT NULL DEFAULT 0,
  `significant` varchar(255) DEFAULT NULL,
  `room_order` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_todolist_todolist_option_id_from_todolist_options_id` (`todolist_option_id`),
  KEY `fk_todolist_history_id_from_histories_id_idx` (`history_id`),
  CONSTRAINT `fk_todolist_history_id_from_histories_id` FOREIGN KEY (`history_id`) REFERENCES `histories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_todolist_todolist_option_id_from_todolist_options_id` FOREIGN KEY (`todolist_option_id`) REFERENCES `todolist_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.todolists:~20 rows (대략적) 내보내기
DELETE FROM `todolists`;
INSERT INTO `todolists` (`id`, `history_id`, `todolist_option_id`, `is_checked`, `significant`, `room_order`) VALUES
	(99, 43, 1, 0, '', 1),
	(100, 43, 2, 0, '', 1),
	(101, 43, 3, 0, '', 1),
	(102, 43, 35, 0, '', 1),
	(103, 42, 1, 1, '', 1),
	(104, 42, 2, 1, '', 1),
	(105, 42, 3, 1, '', 1),
	(106, 42, 35, 1, '', 1),
	(123, 47, 1, 1, '', 1),
	(124, 47, 2, 1, '', 1),
	(125, 47, 3, 1, '', 1),
	(126, 47, 35, 1, '', 1),
	(127, 49, 8, 1, '', 1),
	(128, 49, 9, 1, 'dfd', 1),
	(129, 49, 10, 1, '', 1),
	(130, 49, 11, 1, '', 1),
	(131, 49, 40, 1, '', 1),
	(132, 49, 41, 1, '', 1),
	(133, 49, 42, 1, '', 1),
	(134, 49, 43, 1, '', 1);

-- 테이블 whatisthis.todolist_images 구조 내보내기
CREATE TABLE IF NOT EXISTS `todolist_images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `todolist_id` bigint(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_todolist_images_todolist_id_from_todolist_id` (`todolist_id`),
  CONSTRAINT `fk_todolist_images_todolist_id_from_todolist_id` FOREIGN KEY (`todolist_id`) REFERENCES `todolists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.todolist_images:~4 rows (대략적) 내보내기
DELETE FROM `todolist_images`;
INSERT INTO `todolist_images` (`id`, `todolist_id`, `image_url`) VALUES
	(81, 100, '15cada98-3a26-4fc5-907d-c6bc68cad0aa-captured_image.jpg'),
	(82, 100, 'a956a01b-8296-4b2d-b632-1552ac234002-captured_image.jpg'),
	(88, 124, '1af495b7-82f3-4500-8e12-752a0150f699-captured_image.jpg'),
	(89, 128, '3473a7a7-e53d-4a7f-8c4f-4e9ca3efb812-captured_image.jpg');

-- 테이블 whatisthis.todolist_options 구조 내보내기
CREATE TABLE IF NOT EXISTS `todolist_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_todolist_options_room_id_from_rooms_id` (`room_id`),
  CONSTRAINT `fk_todolist_options_room_id_from_rooms_id` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 whatisthis.todolist_options:~62 rows (대략적) 내보내기
DELETE FROM `todolist_options`;
INSERT INTO `todolist_options` (`id`, `room_id`, `content`) VALUES
	(1, 1, '문 열림 확인'),
	(2, 1, '신발장 확인'),
	(3, 1, '조명 스위치 확인'),
	(4, 2, '벽 흠집 확인'),
	(5, 2, '바닥 마감 확인'),
	(6, 2, '거실 조명 확인'),
	(7, 2, '창문 열림 확인'),
	(8, 3, '싱크대 수압 확인'),
	(9, 3, '가스렌지 점화'),
	(10, 3, '냉장고 전원'),
	(11, 3, '식탁 손상'),
	(12, 4, '바닥 상태'),
	(13, 4, '조명 스위치'),
	(14, 4, '테이블 상태'),
	(15, 5, '샤워기 수압'),
	(16, 5, '화장실 바닥'),
	(17, 5, '변기 사용'),
	(18, 5, '세면대 수압'),
	(19, 6, '침대 상태'),
	(20, 6, '옷장 문 열기'),
	(21, 6, '방문 잠금기능 확인'),
	(22, 6, '벽 손상'),
	(23, 7, '베란다 바닥 확인'),
	(24, 7, '창문 점검'),
	(25, 7, '물건 저장'),
	(26, 8, '방문 잠금 점검'),
	(27, 8, '벽 상태'),
	(28, 8, '가구 상태 점검'),
	(29, 9, '다용도실 물건'),
	(30, 9, '바닥 상태'),
	(31, 9, '조명 확인'),
	(32, 10, '세탁기 작동'),
	(33, 10, '건조대 상태'),
	(34, 10, '조명 확인'),
	(35, 1, '문 닫힘 확인'),
	(36, 2, '벽 손상 확인'),
	(37, 2, '거실 스위치 확인'),
	(38, 2, '창문 닫힘 확인'),
	(39, 2, '창문락 확인'),
	(40, 3, '싱크대 배수 확인'),
	(41, 3, '가스 누출 확인'),
	(42, 3, '냉장고 기능'),
	(43, 3, '의자 손상'),
	(44, 4, '바닥 흠집'),
	(45, 4, '조명 기능'),
	(46, 4, '의자 상태'),
	(47, 5, '샤워기 배수'),
	(48, 10, '스위치 확인'),
	(49, 5, '물 새는지'),
	(50, 5, '이상 유무'),
	(51, 5, '세면대 배수'),
	(52, 6, '매트리스 상태'),
	(53, 6, '옷장 문 닫기'),
	(54, 6, '천장 손상'),
	(55, 7, '창문락 점검'),
	(56, 7, '저장 상태'),
	(57, 8, '천장 상태'),
	(58, 9, '저장 상태'),
	(59, 9, '벽 상태'),
	(60, 9, '전원 스위치'),
	(61, 10, '세탁기 배수'),
	(62, 10, '수납장 상태');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
