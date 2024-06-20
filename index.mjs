// index.mjs
import inquirer from 'inquirer';
import db from './db/db.mjs';
import { viewAllDepartments, addDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole } from './queries/employees.mjs';

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
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      await viewAllEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      db.end();
      return;
  }

  mainMenu();
}

mainMenu();
