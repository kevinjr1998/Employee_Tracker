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


INSERT INTO employee_roles (id, title, salary, department_id)
VALUES (200, "Sales Ledger clerk", "300", (SELECT id FROM `departments` WHERE `department` = 'Finance'));






-- SELECT a.id, a.first_name, a.last_name, employee_roles.title AS `Job Role`, employee_roles.salary, b.first_name AS managerFirstName, b.last_name AS managerLastName 
-- FROM employees a, employees b, employee_roles
-- WHERE a.manager_id = a.id OR a.manager_id IS NULL;
