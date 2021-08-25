const inquirer = require("inquirer");
const mysql = require('mysql2');
const express = require(`express`);
const queries = require("./queries/queries")

const PORT = 3001;
const app = express();

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
                queries.getDepartments();
                Init();
                break;
            case "View All Roles":
                queries.getRoles();
                Init();
                break;
            case "View All Employees":
                queries.getEmployees();
                Init();
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
        queries.db.query(`
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
        queries.db.query(`
        INSERT INTO employee_roles (id, title, salary, department_id)
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
        queries.db.query(`
        INSERT INTO employee_roles (id, title, salary, department_id)
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

Init();

