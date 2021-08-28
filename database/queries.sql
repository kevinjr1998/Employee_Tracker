-- SELECT employees.id, a.first_name, a.last_name, employee_roles.title AS `Job Role`, employee_roles.salary, a.first_name AS managerFirstName, a.last_name AS managerLastName 
-- FROM employees a, employees b, departments
-- WHERE a.manager_id = b.id
-- JOIN employee_roles ON employees.role_id = employee_roles.id;

-- SELECT employees.id, employees.first_name, employees.last_name,  employees.manager_id, employee_roles.title AS "Job Role", employee_roles.salary,
-- departments.department
-- FROM employees, employee_roles, departments
-- WHERE employee_roles.department_id = departments.id AND employees.role_id = employee_roles.id;

-- SELECT departments.department, employee_roles.title AS "Job Role", employee_roles.id AS "role_id", employee_roles.salary
-- FROM departments, employee_roles
-- WHERE departments.id = employee_roles.department_id;

-- INSERT INTO departments (id, department)
-- VALUES ("5", "Sales");


--  INSERT INTO employees (first_name, last_name, role_id, manager_id)
--         VALUES ("Randy", "Baker", 
--         (SELECT id FROM employee_roles WHERE 'title' = 'Lead Salesperson'), 
--         (SELECT id FROM employees a WHERE 'first_name' = '' AND 'last_name' = ''));


-- SELECT title from employee_roles;

-- UPDATE employees
-- SET role_id = (SELECT id FROM employee_roles WHERE title = 'Lead Salesperson')
-- WHERE last_name = 'Smith' AND first_name = 'John';


-- SELECT a.id, a.first_name, a.last_name, employee_roles.title AS `Job Role`, employee_roles.salary, b.first_name AS managerFirstName, b.last_name AS managerLastName 
-- FROM employees a, employees b, employee_roles
-- WHERE a.manager_id = a.id OR a.manager_id IS NULL;



-- DELETE FROM employee_roles 
-- WHERE id =  ;


-- INSERT INTO employee_roles(id, title, salary, department_id) +
-- VALUES (005, "Accounts Junior", "18000", );

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', '100', NULL);


-- IN (SELECT a.id FROM employees a 
--     JOIN employees b 
--     ON (a.id = b.id)
--     WHERE b.last_name = 'Smith' AND b.first_name = 'John');

--  SELECT a.id FROM employees a 
--     JOIN employees b 
--     ON (a.id = b.id)
--     WHERE b.last_name = 'Smith' AND b.first_name = 'John';