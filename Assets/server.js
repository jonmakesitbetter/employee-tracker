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
      }
      // } else answer.menu === "Update employee role";
      // updateEmployee();
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
  connection.query(
    "SELECT * FROM role;",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      init();
    }
  );
}

function addEmployee(){
  inquirer
  .prompt([
    {
      name: "firstName",
      message: "What is the employee's first name?",
      type: "input"
    },
    {
      name: "lastName",
      message: "What is the employee's last name?",
      type: "input"
    },
    {
      name: "roleId",
      message: "What is the employee's role id?",
      type: "input"
    },
    {
      name: "managerId",
      message: "Please input the employee's manager id if they have one.",
      type: "input"
    }
  ]).then(function(answer){
    // INSERT INTO `employee_tracker_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('ASDF', 'SADF', '3', '2');
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.roleId,
        manager_id: answer.managerId
      },
      function(err){
        if (err) {
          console.log("Error, try again.", err);
          init();
        };
      }
    )
console.log(answer.firstName, answer.lastName, answer.roleId, answer.managerId);
  });
}
function addDepartment(){
  console.loog("addDepartment");
}
function addRole(){
  console.log("addRole");
}

// function updateEmployee(){
//   connection.query("UPDATE employee SET title = ? WHERE id = ?", function (err, results) {
//     if(err) throw err;
    
    
//     // if (err) throw err;
//     // let updatedEmployee = [];
//     // for (var i = 0; i < results.length; i++) {
//     //   updatedEmployee.push(results[i].title);
//     }
//     inquirer
//       .prompt([
//         {
//           name: 'choice',
//           type: 'rawlist',
//           choices: updatedEmployee,
//           message: 'Which employee would you like to update?'
//         },
//         {
//           name: 'change',
//           type: 'input',
//           message: 'Please input your change.'
//         }
//       ])
//       .then(function (answer) {
//         // get the information of the chosen item
//         var updatedEmployee;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].first_name === answer.choice) {
//             updatedEmployee = results[i];
//           }
//         }

//           connection.query(
//             'UPDATE auctions SET ? WHERE ?',
//             [
//               {
//                 first_name: answer.change
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
