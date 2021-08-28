const mysql = require("mysql2");
const password = require("../password.json");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: password.password,
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.\nWelcome to the Employee Tracker.\n`)
);

function deptQuery() {
  const queryRes = db.promise().query(`SELECT * FROM departments;`);
  return queryRes;
}

function roleQuery() {
  const queryRes = db.promise().query(`
    SELECT departments.department, employee_roles.title AS "Job Role", employee_roles.id AS "role_id", employee_roles.salary
    FROM departments, employee_roles
    WHERE departments.id = employee_roles.department_id;`);
  return queryRes;
}

function empQuery() {
  const queryRes = db.promise().query(`
  SELECT employees.id, employees.first_name, employees.last_name, employee_roles.title AS "Job Role", employee_roles.salary, departments.department, employees.manager_id
  FROM employees, employee_roles, departments
  WHERE employee_roles.department_id = departments.id AND employees.role_id = employee_roles.id;`);
  return queryRes;
}

function deptQueryAdd(answers) {
  const queryRes = db.promise().query(`
    INSERT INTO departments (id, department)
    VALUES ("${answers.newDeptID}", "${answers.newDept}");`);
  return queryRes;
}

async function newRoleAdd(answers) {
  const queryRes = await db.promise().query(`
        INSERT INTO employee_roles(id, title, salary, department_id)
        VALUES (${answers.newRoleID}, "${answers.newRole}", "${answers.salary}", ${answers.deptID});`);
  return queryRes;
}

async function rolesOnly() {
  const [rows, fields] = await db
    .promise()
    .query(`SELECT title, id from employee_roles;`);
  const roleTitles = rows.map(function (role) {
    return {
      name: `${role.title}`,
      value: role.id,
    };
  });
  return roleTitles;
}

async function deptsOnly() {
  const [rows, fields] = await db
    .promise()
    .query(`SELECT department, id FROM departments;`);
  const deptTitles = rows.map(function (dept) {
    return {
      name: dept.department,
      value: dept.id,
    };
  });
  return deptTitles;
}

async function namesOnly() {
  const [row, fields] = await db
    .promise()
    .query(`SELECT first_name, last_name, id FROM employees;`);
  const inquirerNameChoices = row.map(function (result) {
    return {
      name: `${result.first_name} ${result.last_name}`,
      value: result.id,
    };
  });
  inquirerNameChoices.push({name: "None",
  value: null,});
  return inquirerNameChoices;
}

function addNewEmp(answers) {
  const queryRes = db.promise().query(`
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ('${answers.newEmpFirstName}', '${answers.newEmpLastName}', '${answers.newEmpRoleID}', ${answers.newEmpManagerID});
  `);
  debugger;
  return queryRes;
}

async function updateRole(answers) {
  const queryRes = await db.promise().query(`
    UPDATE employees
    SET role_id = ${answers.newEmpRoleID}
    WHERE id = ${answers.empNameID};`);
  return queryRes;
}

async function deleteEmployee(answers) {
  const queryRes = await db
    .promise()
    .query(`DELETE FROM employees WHERE id = '${answers.empNameID}';`);
  return queryRes;
}

async function deleteRole(answers) {
    const queryRes = await db
      .promise()
      .query(`DELETE FROM employee_roles WHERE id = '${answers.empRoleID}';`);
    return queryRes;

  };

  async function deleteDepartment(answers) {
    const queryRes = await db
      .promise()
      .query(`DELETE FROM departments WHERE id = '${answers.empDeptID}';`);
    return queryRes;
  };

module.exports = {
  deptQuery,
  roleQuery,
  empQuery,
  deptQueryAdd,
  newRoleAdd,
  rolesOnly,
  deptsOnly,
  namesOnly,
  addNewEmp,
  updateRole,
  deleteEmployee,
  deleteRole,
  deleteDepartment,
};
