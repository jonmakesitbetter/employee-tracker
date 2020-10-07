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
        viewDepartment();
      } else if (answer.menu === "View all roles") {
        viewRole();
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
    `SELECT first_name, last_name, title, salary, manager_id
          FROM employee
          INNER JOIN role ON employee.role_id = role.id;`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      init();
    }
  );
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role;", function (err, results) {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "What is the employee's first name?",
        type: "input",
      },
      {
        name: "lastName",
        message: "What is the employee's last name?",
        type: "input",
      },
      {
        name: "roleId",
        message: "What is the employee's role id?",
        type: "input",
      },
      {
        name: "managerId",
        message: "Please input the employee's manager id if they have one.",
        type: "input",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err) {
          if (err) {
            console.log("Error, try again.", err);
            return
          }
          init();
        }
      );
    });
};
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        message: "What is the new department called?",
        type: "input"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.department
        },
        function (err) {
          if (err) {
            console.log("Error, try again.", err);
            init();
          }
        }
      );
    });
};
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the new title?",
        type: "input",
      },
      {
        name: "salary",
        message: "What is the new title's salary?",
        type: "input",
      },
      {
        name: "departmentId",
        message: "What is the new title's department id?",
        type: "input",
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId
        },
        function (err) {
          if (err) {
            console.log("Error, try again.", err);
            return
          }
          init();
        }
      );
    });
};

function updateEmployee() {
  connection.query('SELECT * FROM employee', function (err, results) {
    if (err) throw err;
    var employeeArray = [];
    for (var i = 0; i < results.length; i++) {
      employeeArray.push(results[i].last_name);
    }
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices: employeeArray,
          message: 'What is the last name of the employee would you like to update?'
        },
        {
          name: 'first_name',
          type: 'input',
          message: 'Please update their first name.'
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'Please update their last name,'
        },
        {
          name: 'role_id',
          type: 'input',
          message: 'Please update their role id.'
        },
        {
          name: 'manager_id',
          type: 'input',
          message: 'Please update their manager id.'
        },
      ])
      .then(function (answer) {
        var updatedEmployee;
        for (var i = 0; i < results.length; i++) {
          if (results[i].last_name === answer.choice) {
            updatedEmployee = results[i].last_name;
          }
        }
             connection.query(
            'UPDATE auctions SET ? WHERE ?',
            [
              {
                first_name: answer.first_name
              },
              {
                id: updatedEmployee.id
              },
              {
                last_name: answer.last_name
              },
              {
                id: updatedEmployee.id
              },
              {
                role_id: answer.role_id
              },
              {
                id: updatedEmployee.id
              },
              {
                manager_id: answer.manager_id
              },
              {
                id: updatedEmployee.id
              }
            ],
          );
    });
  });
}