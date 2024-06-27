import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { viewAllDepartments, addDepartment, deleteDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole, deleteRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, deleteEmployee } from './queries/employees.mjs';

function showMenu() {
  console.clear();
  figlet('Employee Tracker', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(gradient.rainbow(data));

    inquirer.prompt([
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
          'Update employee role',
          'Update employee manager',
          'View employees by manager',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
          'Exit',
        ],
      },
    ]).then((answers) => {
      handleMenuSelection(answers.action);
    });
  });
}

function handleMenuSelection(action) {
  switch (action) {
    case 'View all departments':
      viewAllDepartments().then(() => showMenu());
      break;
    case 'View all roles':
      viewAllRoles().then(() => showMenu());
      break;
    case 'View all employees':
      viewAllEmployees().then(() => showMenu());
      break;
    case 'Add a department':
      inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter department name:' }
      ]).then((answers) => {
        addDepartment(answers.name).then(() => showMenu());
      });
      break;
    case 'Add a role':
      inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter role salary:' },
        { type: 'input', name: 'department_id', message: 'Enter department ID:' },
      ]).then((answers) => {
        addRole(answers.title, answers.salary, answers.department_id).then(() => showMenu());
      });
      break;
    case 'Add an employee':
      inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'input', name: 'role_id', message: 'Enter role ID:' },
        { type: 'input', name: 'manager_id', message: 'Enter manager ID (or leave blank if none):', default: null },
      ]).then((answers) => {
        addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id).then(() => showMenu());
      });
      break;
    case 'Update employee role':
      inquirer.prompt([
        { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
        { type: 'input', name: 'role_id', message: 'Enter new role ID:' },
      ]).then((answers) => {
        updateEmployeeRole(answers.employee_id, answers.role_id).then(() => showMenu());
      });
      break;
    case 'Update employee manager':
      inquirer.prompt([
        { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
        { type: 'input', name: 'manager_id', message: 'Enter new manager ID:' },
      ]).then((answers) => {
        updateEmployeeManager(answers.employee_id, answers.manager_id).then(() => showMenu());
      });
      break;
    case 'View employees by manager':
      inquirer.prompt([
        { type: 'input', name: 'manager_id', message: 'Enter manager ID:' },
      ]).then((answers) => {
        viewEmployeesByManager(answers.manager_id).then(() => showMenu());
      });
      break;
    case 'Delete a department':
      inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter department ID:' },
      ]).then((answers) => {
        deleteDepartment(answers.id).then(() => showMenu());
      });
      break;
    case 'Delete a role':
      inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter role ID:' },
      ]).then((answers) => {
        deleteRole(answers.id).then(() => showMenu());
      });
      break;
    case 'Delete an employee':
      inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter employee ID:' },
      ]).then((answers) => {
        deleteEmployee(answers.id).then(() => showMenu());
      });
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }
}

showMenu();
