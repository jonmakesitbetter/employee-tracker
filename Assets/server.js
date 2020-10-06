const mysql = require('mysql');
const inquirer = require('inquirer');
const { start } = require('repl');
const { allowedNodeEnvironmentFlags } = require('process');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "J@eger84",
    database: "employee_tracker_db",
});

connection.connect (function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    init();
});


  function init() {
     inquirer
      .prompt({
          name: 'menu',
          type: 'list',
          message: 'What would you like to do?',
          choices: ['View all employees', 
            'View employees by department',
            'View employees by manager',
            'Add employee',
            'Update employee role',
            'Add role',
            'Add department']
      }).then(function (answer) {
       if (answer.menu === 'View all employees'){
        viewEmployee();
       } else if (answer.menu === 'View employees by department'){
        viewEmployeeDepartment();
       } else if (answer.menu === 'View employees by manager'){
           viewEmployeeManager();
    } else if (answer.menu === 'Add employee'){
           addEmployee();
    } else if (answer.menu === 'Update employee role'){
           updateRole();
    } else if (answer.menu === 'Add role'){
           addRole();
    } else (answer.menu === 'Add department'){
           addDepartment();
    }


      })
  }

  function viewEmployee() {
          connection.query('SELECT * FROM employee', function (err, results){
          if (err) throw err;
            console.table(results);
          }
          )}

