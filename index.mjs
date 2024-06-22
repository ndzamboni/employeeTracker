import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { viewAllDepartments, addDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole, updateRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole } from './queries/employees.mjs';
import client from './db/db.mjs';

// Randomize menu item colors
function randomColor(text) {
  const colors = [chalk.red, chalk.green, chalk.yellow, chalk.blue, chalk.magenta, chalk.cyan, chalk.white];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor(text);
}

const mainMenuChoices = [
  { name: randomColor('View all departments'), value: 'view_departments' },
  { name: randomColor('View all roles'), value: 'view_roles' },
  { name: randomColor('View all employees'), value: 'view_employees' },
  { name: randomColor('Add a department'), value: 'add_department' },
  { name: randomColor('Add a role'), value: 'add_role' },
  { name: randomColor('Add an employee'), value: 'add_employee' },
  { name: randomColor('Update an employee role'), value: 'update_employee_role' },
  { name: randomColor('Update a role'), value: 'update_role' },
  { name: randomColor('Exit'), value: 'exit' }
];

async function displayAsciiArt() {
  return new Promise((resolve, reject) => {
    figlet('Employee Tracker', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function mainMenu() {
  const asciiArt = await displayAsciiArt();
  console.log(chalk.cyan(asciiArt));

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: mainMenuChoices
    }
  ]);

  switch (action) {
    case 'view_departments':
      await viewAllDepartments();
      break;
    case 'view_roles':
      await viewAllRoles();
      break;
    case 'view_employees':
      await viewAllEmployees();
      break;
    case 'add_department':
      await addDepartment();
      break;
    case 'add_role':
      await addRole();
      break;
    case 'add_employee':
      await addEmployee();
      break;
    case 'update_employee_role':
      await updateEmployeeRole();
      break;
    case 'update_role':
      await updateRole();
      break;
    case 'exit':
      await client.end();
      console.log('Goodbye!');
      process.exit(0);
  }
  await mainMenu();
}

mainMenu();
