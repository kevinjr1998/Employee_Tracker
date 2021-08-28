const inquirer = require("inquirer");
const queries = require("./queries/queries");


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
            case "Quit":
                exitApp();
                break;
          }
      })
}



function getDepartments(){
   queries.deptQuery()
    .then(([rows, fields]) => {
            console.log(`\n`);
            console.table(rows);
            Init();  
        }) 
    .catch(console.log)
        Init
      };



function getRoles(){
        queries.roleQuery()
        .then(([rows, fields]) => {
            console.log(`\n`);
            console.table(rows);
            Init();  
        }) 
    .catch(console.log)
    Init();
      };
      


function getEmployees(){
    queries.empQuery()
    .then(([rows, fields]) => {
        const employees = rows.map(employee => {
            if (employee.manager_id) {
                employee.manager = `${rows.find(({id}) => id === employee.manager_id).first_name} ${rows.find(({id}) => id === employee.manager_id).last_name}` ;
            } else {
                employee.manager = `none`;
            }
        
            return employee;
        });

        console.log(`\n`);
        console.table(employees);
        Init();
        })
        .catch(console.log)
        Init();
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
        queries.deptQueryAdd(answers)
        .then(([rows, fields]) => {
        console.log(`\n Department Added \n`);
        console.table(rows); 
        Init();           
        })
        .catch(console.log);
        Init();
    })
     
};


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

Init();