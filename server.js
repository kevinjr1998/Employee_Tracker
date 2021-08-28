const inquirer = require("inquirer");
const mysql = require('mysql2');
const express = require(`express`);
// const queries = require("./queries/queries")
const password = require("./password.json");
const { query } = require("express");


const PORT = 3001;
const app = express();

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


function Init() {
    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "What Do You Want To Do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add an Employee", "Update Employee Role"],
      })
      .then((answer) => {
        switch (answer.task) {
            case "View All Departments":
                getDepartments();
                break;
            case "View All Roles":
                getRoles();
                break;
            case "View All Employees":
                getEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
          }
      })
}



function getDepartments(){
    db.query(`SELECT * FROM departments;`, function (err, results) {
        if (err){
            console.log(err);
        } else {
            console.log(`\n`);
            console.table(results);
        } 
        Init();
      });

     
}

function getRoles(){
    db.query(`
    SELECT departments.department, employee_roles.title AS "Job Role", employee_roles.id AS "role_id", employee_roles.salary
    FROM departments, employee_roles
    WHERE departments.id = employee_roles.department_id;`, function (err, results) {
        if (err){
            console.log(err);
        } else {
            console.log(`\n`);
            console.table(results);
        }
        Init();
      });
      
}

function getEmployees(){
    db.query(`
    SELECT employees.id, employees.first_name, employees.last_name,  employees.manager_id, employee_roles.title AS "Job Role", employee_roles.salary,
    departments.department
    FROM employees, employee_roles, departments
    WHERE employee_roles.department_id = departments.id AND employees.role_id = employee_roles.id;`, function (err, results) {
        const employees = results.map(employee => {
            if (employee.manager_id) {
                employee.manager = `${results.find(({id}) => id === employee.manager_id).first_name} ${results.find(({id}) => id === employee.manager_id).last_name}` ;
            } else {
                employee.manager = `none`;
            }
        
            return employee;
        })
            if (err){
                console.log(err);
            } else {
                console.log(`\n`);
                console.table(employees);
            }
           Init();  
      });
     
}


function addDepartment(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Name of New Department?",
            name: "newDept",
          },
          {
              type: "input",
              message: "Department ID?",
              name: "newDeptID",
          }
    ])
    .then((answers) => {
        db.query(`
        INSERT INTO departments (id, department)
        VALUES ("${answers.newDeptID}", "${answers.newDept}");`, function(err, results){
            if (err){
                console.log(err);
            } else {
                console.log(`\n Department Added \n`);
                console.table(results);
            }
            Init();
        });
    })
}

function addRole(){

    inquirer
    .prompt([
        {
            type: "input",
            message: "Name of New Role?",
            name: "newRole",
          },
          {
              type: "input",
              message: "Role ID?",
              name: "newRoleID",
          },
          {
            type: "input",
            message: "Salary?",
            name: "salary",
        },
        {
            type: "input",
            message: "Department?",
            name: "dept",
        },
  ])
    .then((answers) => {
        db.query(`
        INSERT INTO employee_roles(id, title, salary, department_id)
        VALUES (${answers.newRoleID}, "${answers.newRole}", "${answers.salary}", (SELECT id FROM departments WHERE department = '${answers.dept}'));`, 
        function(err, results){
            if (err){
                console.log(err);
            } else {
                console.log(`\n Role Added \n`);
                console.table(results);
            }
            Init();
        });
    })
}


function addEmployee(){
    db.query(`SELECT title from employee_roles;`,
    function(err, results){
     const roleTitles = results.map(function(result){
        return result.title;
    });
    inquirer
    .prompt([
        {
            type: "input",
            message: "First Name of New Employee?",
            name: "newEmpFirstName",
          },
          {
              type: "input",
              message: "Last Name of New Employee?",
              name: "newEmpLastName",
          },
          {
            type: "list",
            message: "Employee Role?",
            name: "newEmpRole",
            choices: roleTitles,
        },
        {
            type: "input",
            message: "Employee Manager First Name",
            name: "newEmpManagerFirstName",
        },
        {
            type: "input",
            message: "Employee Manager Last Name",
            name: "newEmpManagerLastName",
        },
  ])
    .then((answers) => {
        db.query(`
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ("Randy", "Baker", 
        (SELECT id FROM employee_roles WHERE 'title' = 'Lead Salesperson'), 
        (SELECT id FROM employees a WHERE 'first_name' = '' AND 'last_name' = ''));`
         , 
        function(err, results){
         
            if (err){
                console.log(err);
            } else {
                console.log(`\n Employee Added \n`);
                console.table(results);
            }
            Init();
        });
    })
})
}

function updateRole(){
    db.query(`SELECT title FROM employee_roles;`,
    function(err, results){
        const roleTitles = results.map(function(result){
            return result.title;
    });
    inquirer
    .prompt([
        {
            type: "input",
            message: "First Name of Employee?",
            name: "empFirstName",
          },
          {
              type: "input",
              message: "Last Name of Employee?",
              name: "empLastName",
          },
          {
            type: "list",
            message: "Updated Role?",
            name: "newEmpRole",
            choices: roleTitles,
        },
  ])
    .then((answers) => {
        db.query(`
        UPDATE employees
        SET role_id = (SELECT id FROM employee_roles WHERE title = '${answers.newEmpRole}')
        WHERE last_name = '${answers.empLastName}' AND first_name = '${answers.empFirstName}';`
         , 
        function(err, results){
         
            if (err){
                console.log(err);
            } else {
                console.log(`\n Employee Updated \n`);
                console.table(results);
            }
            Init();
        });
    })
})
}

