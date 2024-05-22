DROP DATABASE IF EXISTS `bughounddb`;
CREATE DATABASE `bughounddb`;
use `bughounddb`;

CREATE TABLE IF NOT EXISTS `employee` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(255) NOT NULL UNIQUE,
  `username` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `is_active` int NOT NULL DEFAULT 1,
  `userlevel` varchar(255) NOT NULL,
  PRIMARY KEY (`emp_id`),
  CHECK((`is_active`) IN (0,1))
);

CREATE TABLE IF NOT EXISTS `program` (
  `program_id` int NOT NULL AUTO_INCREMENT,
  `program_name` varchar(255) NOT NULL,
  `program_release` varchar(255) NOT NULL,
  `program_version` varchar(255) NOT NULL,
  PRIMARY KEY (`program_id`)
);

CREATE TABLE IF NOT EXISTS `area` (
  `area_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `program_id` int,
  `area` varchar(255) NOT NULL,
  FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`)
);

CREATE TABLE IF NOT EXISTS `bug` (
  `bug_id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `report_type` varchar(255) NOT NULL,
  `severity` varchar(255) NOT NULL DEFAULT 'Mild',
  `problem_summary` varchar(255) NOT NULL,
  `problem` varchar(225) NOT NULL,
  `reproducible` varchar(255) NOT NULL,
  `suggested_fix` varchar(255) DEFAULT NULL,
  `reported_by` int NOT NULL,
  `reported_date` datetime NOT NULL,
  `functional_area` varchar(255) DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT "Open",
  `priority` varchar(255) DEFAULT NULL,
  `resolution` varchar(255) DEFAULT NULL,
  `resolution_version` varchar(255) DEFAULT NULL,
  `resolved_by` int DEFAULT NULL,
  `resolved_date` date DEFAULT NULL,
  `tested_by` int DEFAULT NULL,
  `tested_date` date DEFAULT NULL,
  `treat_as_deferred` varchar(255) DEFAULT NULL,
  FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`),
  FOREIGN KEY (`reported_by`) REFERENCES `employee` (`emp_id`),
  FOREIGN KEY (`assigned_to`) REFERENCES `employee` (`emp_id`),
  FOREIGN KEY (`resolved_by`) REFERENCES `employee` (`emp_id`),
  FOREIGN KEY (`tested_by`) REFERENCES `employee` (`emp_id`)
);

CREATE TABLE IF NOT EXISTS `attachment` (
  `bug_id` int NOT NULL,
  `file` blob,
  FOREIGN KEY (`bug_id`) REFERENCES `bug` (`bug_id`)
);

INSERT INTO `employee` (`emp_id`, `employee_name`, `username`, `password`, `is_active`, `userlevel`) VALUES
(1, 'Admin', 'admin', '$2a$10$vQ7eJdxeVfGBE.F1uCp6cuYzAOOIWB8cnOirqgkZGcNS.TVwVyr3S', 1, 'ROLE_L3'),
(2, 'Visweswar', 'vishu', '$2a$10$vQ7eJdxeVfGBE.F1uCp6cuYzAOOIWB8cnOirqgkZGcNS.TVwVyr3S', 1, 'ROLE_L1');

