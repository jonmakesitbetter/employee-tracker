DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;


CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(30),
PRIMARY KEY(id)
);

INSERT INTO department(department_name)
VALUES("Manager");

SELECT * FROM department;

CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2),
department_id INT(0),
PRIMARY KEY(id)
);

INSERT INTO role(title)
VALUES("Auditor");

SELECT * FROM role;

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_nam VARCHAR(30),
role_id INT(0),
manager_id INT(0),
PRIMARY KEY(id)
);

INSERT INTO employee(first_name)
VALUES("Sterence");

SELECT * FROM employee;
