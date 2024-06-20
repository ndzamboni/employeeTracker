// index.js
const inquirer = require('inquirer');
const db = require('./db/db');
const departmentQueries = require('./queries/departments');
const roleQueries = require('./queries/roles');
const employeeQueries = require('./queries/employees');

async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        // Bonus features can be added here
        'Exit',
      ],
    },
  ]);

  switch (answers.action) {
    case 'View all departments':
      await departmentQueries.viewAllDepartments();
      break;
    case 'View all roles':
      await roleQueries.viewAllRoles();
      break;
    case 'View all employees':
      await employeeQueries.viewAllEmployees();
      break;
    case 'Add a department':
      await departmentQueries.addDepartment();
      break;
    case 'Add a role':
      await roleQueries.addRole();
      break;
    case 'Add an employee':
      await employeeQueries.addEmployee();
      break;
    case 'Update an employee role':
      await employeeQueries.updateEmployeeRole();
      break;
    case 'Exit':
      db.end();
      return;
  }

  mainMenu();
}

mainMenu();
