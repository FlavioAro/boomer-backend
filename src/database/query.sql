/* 
* Author: Flavio Aro, email: flavio.aro@gmail.com
*/

CREATE DATABASE boomer;


CREATE TABLE `company` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`company_name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`segment` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`street_and_number` VARCHAR(300) NOT NULL COLLATE 'utf8mb4_general_ci',
	`district` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`city` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`state` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_general_ci',
	`comments` LONGTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1;