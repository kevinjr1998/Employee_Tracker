const mysql = require("mysql2");
const inquirer = require("inquirer");
const password = require("../password.json");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: password.password,
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );


function deptQuery(){
    const queryRes = db.promise().query(`SELECT * FROM departments;`);
    return queryRes;
}

function roleQuery(){
    const queryRes = db.promise().query(`
    SELECT departments.department, employee_roles.title AS "Job Role", employee_roles.id AS "role_id", employee_roles.salary
    FROM departments, employee_roles
    WHERE departments.id = employee_roles.department_id;`)
    return queryRes;
}

function empQuery(){
    const queryRes = db.promise().query(`
    SELECT employees.id, employees.first_name, employees.last_name,  employees.manager_id, employee_roles.title AS "Job Role", employee_roles.salary,
    departments.department
    FROM employees, employee_roles, departments
    WHERE employee_roles.department_id = departments.id AND employees.role_id = employee_roles.id;`);
    return queryRes;
}

function deptQueryAdd(answers){
    const queryRes = db.promise().query(`
    INSERT INTO departments (id, department)
    VALUES ("${answers.newDeptID}", "${answers.newDept}");`)
    return queryRes;
}

module.exports = {
    deptQuery,
    roleQuery,
    empQuery,
    deptQueryAdd,
}
