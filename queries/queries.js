// const mysql = require("mysql2");
// const inquirer = require("inquirer");
// const password = require("../password.json");

// getRoleNames()

// db.query(`SELECT title from employee_roles;`,
// function(err, results){
//   const roleTitles = results.map(function(result){
//     return result.title;
// });


// // const db = mysql.createConnection(
// //     {
// //       host: 'localhost',
// //       // MySQL username,
// //       user: 'root',
// //       // MySQL password
// //       password: password.password,
// //       database: 'employees_db'
// //     },
// //     console.log(`Connected to the employees_db database.`)
// //   );


  

// // function getDepartments(){
// //     db.query(`SELECT * FROM departments`, function (err, results) {
// //         if (err){
// //             console.log(err);
// //         } else {
// //             console.log(`\n`);
// //             console.table(results);
// //         }
// //       });
// // }

// // function getRoles(){
// //     db.query(`
// //     SELECT departments.department, employee_roles.title AS "Job Role", employee_roles.id AS "role_id", employee_roles.salary
// //     FROM departments, employee_roles
// //     WHERE departments.id = employee_roles.department_id;`, function (err, results) {
// //         if (err){
// //             console.log(err);
// //         } else {
// //             console.log(`\n`);
// //             console.table(results);
// //         }
// //       });
// // }

// // function getEmployees(){
// //     db.query(`
// //     SELECT employees.id, employees.first_name, employees.last_name,  employees.manager_id, employee_roles.title AS "Job Role", employee_roles.salary,
// //     departments.department
// //     FROM employees, employee_roles, departments
// //     WHERE employee_roles.department_id = departments.id AND employees.role_id = employee_roles.id;`, function (err, results) {
// //         const employees = results.map(employee => {
// //             if (employee.manager_id) {
// //                 employee.manager = `${results.find(({id}) => id === employee.manager_id).first_name} ${results.find(({id}) => id === employee.manager_id).last_name}` ;
// //             } else {
// //                 employee.manager = `none`;
// //             }
        
// //             return employee;
// //         })
// //             if (err){
// //                 console.log(err);
// //             } else {
// //                 console.log(`\n`);
// //                 console.table(employees);
// //             }
// //       });
// // }

// // // function addDepartment(){
// // //     inquirer
// // //     .prompt([
// // //         {
// // //             type: "input",
// // //             message: "Name of New Department?",
// // //             name: "newDept",
// // //           },
// // //           {
// // //               type: "input",
// // //               message: "Department ID?",
// // //               name: "newDeptID",
// // //           }
// // //     ])
// // //     .then((answers) => {
// // //         db.query(`
// // //         INSERT INTO departments (id, department)
// // //         VALUES ("${answers.newDeptID}", "${answers.newDept}");`, function(err, results){
// // //             if (err){
// //                 console.log(err);
// //             } else {
// //                 console.log(`\n`);
// //                 console.table(results);
// //             }
// //             Init();
// //         });
// //     })

// // }


// module.exports = {
//     getDepartments,
//     getEmployees,
//     getRoles,
//     db
// }