DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2),
department_id INT,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);

SELECT title, salary, department_name
FROM role
LEFT JOIN department ON role.department_id = department.id;

SELECT first_name, last_name, title, salary
FROM employee
INNER JOIN role ON employee.role_id = role.id;

SELECT department_name, first_name, last_name, title, salary
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id;

SELECT first_name, last_name, title, salary, department_name
FROM employee
RIGHT JOIN role ON employee.role_id = role.id
RIGHT JOIN department ON role.department_id = department.id;

INSERT INTO department(department_name)
VALUES("Accounting"), ("Engineering"), ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES("Auditor", 55000, 1), ("Accountant", 50000, 1), ("Senior Accountant", 85000, 1), ("Programmer", 999999, 2), ("Salesman", 72000, 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Sterence", "Bupkiss", 1), ("Bob", "Paar", 1), 
("Bob", "Paar", 1), ("Bruce", "Wayne", 1), ("Biff", "Stevens", 2), 
("Gor", "Urlag", 2), ("Harold", "Harolds", 2), ("Red", "Leader", 3), 
("Bob", "Johnson", 3), ("Peter", "Parker", 3);