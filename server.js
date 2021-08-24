const inquirer = require("inquirer");
const mysql = require('mysql2');
const express = require(`express`);
const password = require(`./password.json`)

const PORT = 3001;
const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
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
    db.query(`SELECT * FROM departments`, function (err, results) {
        err ? console.log(err) : console.table(results);
        Init();
      });
}

function getRoles(){
    db.query(`SELECT * FROM employee_roles`, function (err, results) {
        err ? console.log(err) : console.table(results);
        Init();
      });
}

function getEmployees(){
    db.query(`SELECT employees.id, employees.first_name, employees.last_name,  employees.manager_id, employee_roles.title AS "Job Role", employee_roles.salary,
    departments.department
    FROM employees, employee_roles, departments
    WHERE employee_roles.department_id = departments.id AND employees.role_id = employee_roles.id`, function (err, results) {
        console.table(results);
        const employees = results.map(employee => {
            if (employee.manager_id) {
                employee.manager = `${results.find(({id}) => id === employee.manager_id).first_name} ${results.find(({id}) => id === employee.manager_id).last_name}` ;
                debugger;
            } else {
                employee.manager = `none`;
            }
        
            return employee;
        })
        err ? console.log(err) : console.table(employees);
        Init();
      });
}


Init();