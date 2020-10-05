var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  
  const PORT = process.env.PORT || 3306;

  user: 'root',

  password: 'J@eger84',
  database: 'greatBay_DB'
});

connection.connect(function (err) {
    if (err) throw err;
   
    start();
  });

  function start() {
      inquirer
      //view employees
//view employees by department
//view employees by manager
//add employee
//update employee role
//add role
//add department
      .prompt({
          name: 'menu',
          type: 'list',
          message: 'What would you like to do?',
          choices: ['View employees by department',
            'View employees by manager',
            'Add employee',
            'Update employee role',
            'Add role',
            'Add department']


      })
  }

