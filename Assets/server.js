const mysql = require('mysql');
// const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  
  port = 3306,

  user: 'root',

  password: 'J@eger84',
  database: 'employee_tracker_db'
});

connection.connect(function (err) {
    if (err) throw err;
   console.log("Connected as id " + connection.threadId + "\n");
   connection.end();
    // start();
  });

//   function start() {
//       inquirer
//       //view employees
// //view employees by department
// //view employees by manager
// //add employee
// //update employee role
// //add role
// //add department
//       .prompt({
//           name: 'menu',
//           type: 'list',
//           message: 'What would you like to do?',
//           choices: ['View employees by department',
//             'View employees by manager',
//             'Add employee',
//             'Update employee role',
//             'Add role',
//             'Add department']
//       })
//   }

