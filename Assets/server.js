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
        "View employees by department",
        "View employees by manager",
        "Add employee",
        "Update employee role",
        "Add role",
        "Add department",
      ],
    })
    .then(function (answer) {
      if (answer.menu === "View all employees") {
        viewEmployee();
      } else if (answer.menu === "View employees by department") {
        viewEmployeeDepartment();
      } else if (answer.menu === "View employees by manager") {
        viewEmployeeManager();
      } else if (answer.menu === "Add employee") {
        addEmployee();
      } else if (answer.menu === "Update employee role") {
        updateRole();
      } else if (answer.menu === "Add role") {
        addRole();
      } else answer.menu === "Add department";
      addDepartment();
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
        `SELECT department_name, first_name, last_name, title, salary
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id;`,
        function (err, results) {
            if (err) throw err;
           inquirer
           .prompt({
             name: "departmentChoice",
             type: "list",
             message: "What department would you like to view?",
             choices: [
               "Accounting", 
               "Engineering",
               "Sales",
               "Return"
             ]
           }).then(function(answer){
            if (answer.departmentChoice === "Accounting") {
              accounting();
            } else if (answer.departmentChoice === "Engineering") {
              engineering();
            } else if (answer.departmentChoice === "Sales"){
              sales();
            } else {
              init();
            }
           })
           }
    )
}
function accounting(){
  connection.query(
    `SELECT first_name, last_name, title, salary, department_name
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id;`, function(err, results){
  if(err) throw err;
  console.table(results);
  init();
}
  )
}
function engineering(){
  connection.query(

  )
}