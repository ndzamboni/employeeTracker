import readline from 'readline';
import db from './db/db.mjs';
import { viewAllDepartments, addDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole } from './queries/employees.mjs';
import figlet from 'figlet';
import chalk from 'chalk';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

// Main menu function
function mainMenu() {
  displayHeader();  // Display the header before the menu

  rl.question(chalk.yellow('What would you like to do? (Type the number)\n') +
              chalk.green('1. View all departments\n') +
              chalk.green('2. View all roles\n') +
              chalk.blue('3. View all employees\n') +
              chalk.magenta('4. Add a department\n') +
              chalk.cyan('5. Add a role\n') +
              chalk.yellow('6. Add an employee\n') +
              chalk.redBright('7. Update an employee role\n') +
              chalk.white('8. Exit\n') +
              '> ', async (answer) => {
    switch (answer.trim()) {
      case '1':
        await viewAllDepartments();
        break;
      case '2':
        await viewAllRoles();
        break;
      case '3':
        await viewAllEmployees();
        break;
      case '4':
        await addDepartment();
        break;
      case '5':
        await addRole();
        break;
      case '6':
        await addEmployee();
        break;
      case '7':
        await updateEmployeeRole();
        break;
      case '8':
        rl.close();
        db.end();
        return;
      default:
        console.log(chalk.red('Invalid option. Please select a number from the menu.'));
        break;
    }

    // Recursively call mainMenu to display the menu again
    mainMenu();
  });
}

// Start the main menu
mainMenu();
