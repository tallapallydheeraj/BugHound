DROP DATABASE IF EXISTS `bg`;
CREATE DATABASE `bg`;
use `bg`;

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
  `attachment` LONGBLOB DEFAULT NULL,
  `attachmentfilename` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`),
  FOREIGN KEY (`reported_by`) REFERENCES `employee` (`emp_id`),
  FOREIGN KEY (`assigned_to`) REFERENCES `employee` (`emp_id`),
  FOREIGN KEY (`resolved_by`) REFERENCES `employee` (`emp_id`),
  FOREIGN KEY (`tested_by`) REFERENCES `employee` (`emp_id`)
);

INSERT INTO `employee` (`emp_id`, `employee_name`, `username`, `password`, `is_active`, `userlevel`) VALUES
(1, 'John Doe', 'johndoe', '$2a$10$vQ7eJdxeVfGBE.F1uCp6cuYzAOOIWB8cnOirqgkZGcNS.TVwVyr3S', 1, 'ROLE_L1'),
(2, 'Jane Smith', 'janesmith', '$2a$10$0QQI90Rs6OeoUom3Am9b3uVMkgUrU.efOgO3YxZeEmgu2TGVtPqVa',1, 'ROLE_L2'),
(3, 'Alice Johnson', 'alicejohnson', '$2a$10$sST9gkCIWK77ESAs2Awi4uFLh9F7I1Kj1YR/CPim7zU0ksAy2JeHO',1, 'ROLE_L3'),
(4, 'Bob Johnson', 'bjohnson', '$2a$10$5K8dTugSDfPP3GyJGBTjfOov9O4NT2jL/mCjx.Soj60DqxN1a0dnW',1, 'ROLE_L1'),
(5, 'Mary Adams', 'madams', '$2a$10$K7ORfLiUJAbzA3UNuk22NeEGw5Mk.oBE30T7mqeg3i6goNtb2Lz6q',1, 'ROLE_L2'),
(6, 'David Lee', 'dlee', '$2a$10$/szUC/m9waFfZUr/lIu6me70a3Nk5ioutKj//LiRy7cwCayFBTGXO',1, 'ROLE_L3');

INSERT INTO `program` (`program_id`, `program_name`, `program_release`, `program_version`) VALUES
(1, 'BugHound', '1.0', '1.0.0'),
(2, 'BugTracker', '2.0', '2.0.0');

INSERT INTO `area` (`area_id`, `program_id`, `area`) VALUES
(1, 1, 'Authentication'),
(2, 1, 'Database Connectivity'),
(3, 1, 'User Interface'),
(4, 2, 'Reporting'),
(5, 2, 'Search'),
(6, 2, 'Dashboard');

INSERT INTO `bug` (`bug_id`, `program_id`, `report_type`,`severity`, `problem_summary`, `problem`, `reproducible`, `suggested_fix`, `reported_by`, `reported_date`, `functional_area`, `assigned_to`, `comments`, `status`, `priority`, `resolution`, `resolution_version`, `resolved_by`, `resolved_date`, `tested_by`, `tested_date`, `treat_as_deferred`, `attachment`, `attachmentfilename`) VALUES
(1, 1, 'Bug','High', 'Login Failed', 'Login functionality is not working', 'Yes', 'Check user credentials', 1, '2024-03-25', 'Authentication', 2, 1, 'Open', 'High', NULL, '1.0.0', 2, NULL, 4, NULL, 'No', NULL, NULL),
(2, 2, 'Bug','Mild', 'Search not working', 'Search functionality is returning incorrect results', 'Yes', 'Check search algorithm', 2, '2024-03-26', 'Search', 3, 2, 'Open', 'High', NULL, '2.0.0', 3, NULL, 4, NULL, 'No', NULL, NULL),
(3, 2, 'Enhancement','Minor', 'Add export feature', 'Users want the ability to export search results', 'Yes', 'Implement export functionality', 3, '2024-03-27', 'Search', 5, 3, 'Open', 'Medium', NULL, '2.0.0', 1, NULL, 6, NULL, 'No', NULL, NULL);





