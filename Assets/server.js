const mysql = require("mysql");
const inquirer = require("inquirer");
const { start } = require("repl");
const { allowedNodeEnvironmentFlags } = require("process");
const { RSA_PSS_SALTLEN_MAX_SIGN } = require("constants");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "J@eger84",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId + "\n");
  init();
});

function init() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee role",
        ],
    })
    .then(function (answer) {
      if (answer.menu === "View all employees") {
        viewEmployee();
      } else if (answer.menu === "View all departments") {
        viewEmployeeDepartment();
      } else if (answer.menu === "View all roles") {
        viewEmployeeRole();
      } else if (answer.menu === "Add employee") {
        addEmployee();
      } else if (answer.menu === "Add department") {
        addDepartment();
      } else if (answer.menu === "Add role") {
        addRole();
      } else answer.menu === "Update employee role";
      updateEmployee();
    });
}
function viewEmployee() {
  connection.query(
    `SELECT first_name, last_name, title, salary
          FROM employee
          INNER JOIN role ON employee.role_id = role.id;`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      init();
      }
  );
}
function viewEmployeeDepartment() {
    connection.query(
      `SELECT * FROM department`, function(err, results){
        if (err) throw err;
        console.table(results);
      }
    )}
