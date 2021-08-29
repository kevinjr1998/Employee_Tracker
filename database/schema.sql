DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments(
    id INT NOT NULL,
    department VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE employee_roles (
    id INT NOT NULL ,
    title VARCHAR(30),
    salary DECIMAL (10, 2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES employee_roles(id)
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)

);