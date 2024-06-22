import inquirer from 'inquirer';
import { viewAllDepartments, addDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole } from './queries/employees.mjs';
import chalk from 'chalk';
import figlet from 'figlet';
import dotenv from 'dotenv';
dotenv.config();

// List of chalk colors
const chalkColors = [
  chalk.red,
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.cyan,
  chalk.white,
  chalk.gray
];

// Main menu options
const mainMenuOptions = [
  'View all departments',
  'View all roles',
  'View all employees',
  'Add a department',
  'Add a role',
  'Add an employee',
  'Update an employee role',
  'Exit'
];

// Function to get a random chalk color
function getRandomColor() {
  return chalkColors[Math.floor(Math.random() * chalkColors.length)];
}

// Randomize menu options with colors
const coloredMenuOptions = mainMenuOptions.map((option, index) => ({
  name: getRandomColor()(`${index + 1}. ${option}`),
  value: index
}));

async function mainMenu() {
  console.log(chalk.green(figlet.textSync('Employee Tracker')));

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: coloredMenuOptions
    }
  ]);

  switch (action) {
    case 0:
      await viewAllDepartments();
      break;
    case 1:
      await viewAllRoles();
      break;
    case 2:
      await viewAllEmployees();
      break;
    case 3:
      await addDepartment();
      break;
    case 4:
      await addRole();
      break;
    case 5:
      await addEmployee();
      break;
    case 6:
      await updateEmployeeRole();
      break;
    case 7:
      process.exit();
  }
  await mainMenu(); // Ensure the main menu is called again after each action
}

mainMenu();
