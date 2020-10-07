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

function viewDepartment() {
  connection.query(`SELECT * FROM department`, function (err, results) {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function viewRole() {
  connection.query(
    `SELECT * FROM role;`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      init();
    }
  );
}

function addEmployee(){
  console.log("addemployee");
}
function addDepartment(){
  console.loog("addDepartment");
}
function addRole(){
  console.log("addRole");
}
function updateEmployee(){
  connection.query('SELECT * FROM employee', function (err, results) {
    if (err) throw err;
    let updatedEmployee = [];
    for (var i = 0; i < results.length; i++) {
      updatedEmployee.push(results[i].title);
    }
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices: updatedEmployee,
          message: 'Which employee would you like to update?'
        },
        {
          name: 'change',
          type: 'input',
          message: 'How much would you like to bid?'
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var updatedEmployee;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            updatedEmployee = results[i];
          }
        }

//         // determine if bid was high enough
//         if (updatedEmployee.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             'UPDATE auctions SET ? WHERE ?',
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function (error) {
//               if (error) throw err;
//               console.log('Bid placed successfully!');
//               start();
//             }
//           );
//         } else {
//           // bid wasn't high enough, so apologize and start over
//           console.log('Your bid was too low. Try again...');
//           start();
//         }
//       });
//   });
// }
