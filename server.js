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
        }) 
        .then(() => Init())
    .catch(console.log)
 };



function getRoles(){
        queries.roleQuery()
        .then(([rows, fields]) => {
            console.log(`\n`);
            console.table(rows);
        })
        .then(() =>Init())
        .catch(console.log)
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
    })
    .then(() => Init())
    .catch(console.log)
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
        return;        
        })
        .catch(console.log);
    })
    .then(() =>Init())
     
};


async function addRole(){
   const deptChoices = await queries.deptsOnly();
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
            type: "list",
            message: "Department?",
            name: "dept",
            choices: deptChoices
        },
  ])
    .then((answers) => {
        queries.newRoleAdd(answers)
        .then(([rows, fields]) => {
            console.log(`\n Role Added \n`);
            console.table(rows);
            return;
        }) 
        .catch(console.log)
    })
    .then(() => Init())

}



async function addEmployee(){
    const roleChoices = await queries.rolesOnly()
    const nameChoices = await queries.namesOnly();
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
            name: "newEmpRoleID",
            choices: roleChoices,
        },
        {
            type: "list",
            message: "Employee Manager Name",
            name: "newEmpManagerID",
            choices: nameChoices,
        },
  ])
    .then((answers) => {
        debugger;
        queries.addNewEmp(answers)
        .then(([rows, fields]) => {
                console.log(`\n Employee Added \n`);
                console.table(rows);
                return;
            })
        .catch(console.log)
    })
    .then(() =>Init())
    };


async function updateRole(){
  const roleChoices = await queries.rolesOnly();
  const nameChoices = await queries.namesOnly();
    inquirer
    .prompt([
        {
            type: "list",
            message: "Name of Employee?",
            name: "empNameID",
            choices: nameChoices,
          },
          {
            type: "list",
            message: "Updated Role?",
            name: "newEmpRoleID",
            choices: roleChoices,
        },
  ])
    .then((answers) => {
        queries.updateRole(answers)
        .then(([rows, fields]) =>{
            console.log(`\n Employee Updated \n`);
            console.table(rows);
        })
        .catch(console.log)
    })
    .then(() =>Init())
    }

Init();