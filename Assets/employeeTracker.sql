DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(30),
PRIMARY KEY(id)
);

INSERT INTO department(department_name)
VALUES("Accounting");

INSERT INTO department(department_name)
VALUES("Engineering");

INSERT INTO department(department_name)
VALUES("Sales");

SELECT * FROM department;

CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2),
department_id INT,
PRIMARY KEY(id)
);

SELECT title, salary, department_name
FROM role
INNER JOIN department ON role.department_id = department.id;

INSERT INTO role(title, salary, department_id)
VALUES("Auditor", 55000, 4);

INSERT INTO role(title, salary, department_id)
VALUES("Programmer", 999999, 5);

INSERT INTO role(title, salary, department_id)
VALUES("Salesman", 72000, 6);

SELECT * FROM role;

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);

SELECT first_name, last_name, title, salary
FROM employee
INNER JOIN role ON employee.role_id = role.id;

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Sterence", "Bupkiss", 1);

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Gor", "Urlag", 2);

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Red", "Leader", 3);

SELECT * FROM employee;
