import inquirer from 'inquirer';
import db from './db/db.mjs';
import { viewAllDepartments, addDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole } from './queries/employees.mjs';
import figlet from 'figlet';
import chalk from 'chalk';
import chalkRainbow from 'chalk-rainbow';

// Function to display ASCII art header
function displayHeader() {
  console.log(
    chalk.blue(
      figlet.textSync('Employee Tracker', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
}

async function mainMenu() {
  displayHeader();  // Display the header before the menu

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.yellow('What would you like to do?'),
      choices: [
        chalkRainbow('View all departments'),
        chalk.green('View all roles'),
        chalk.blue('View all employees'),
        chalk.magenta('Add a department'),
        chalk.cyan('Add a role'),
        chalk.yellow('Add an employee'),
        chalk.redBright('Update an employee role'),
        chalk.white('Exit'),
      ],
    },
  ]);

  // Remove color formatting for switch case comparison
  const action = answers.action.replace(
    /[\u001b\u009b][[()#;?]*(([0-9]{1,4}(;[0-9]{0,4})*)?[0-9A-PR-TZcf-nq-uy=><~])|.|\[\d+\]m/g, ''
  );

  switch (action) {
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

  await mainMenu();
}

mainMenu();
