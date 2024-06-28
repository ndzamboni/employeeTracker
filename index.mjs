import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { viewAllDepartments, addDepartment, deleteDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole, deleteRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, deleteEmployee } from './queries/employees.mjs';

async function showMenu() {
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
    ]).then(async (answers) => {
      await handleMenuSelection(answers.action);
    });
  });
}

async function handleMenuSelection(action) {
  try {
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
        const { name } = await inquirer.prompt([{ type: 'input', name: 'name', message: 'Enter department name:' }]);
        await addDepartment(name);
        break;
      case 'Add a role':
        const roleAnswers = await inquirer.prompt([
          { type: 'input', name: 'title', message: 'Enter role title:' },
          { type: 'input', name: 'salary', message: 'Enter role salary:' },
          { type: 'input', name: 'department_id', message: 'Enter department ID:' },
        ]);
        await addRole(roleAnswers.title, roleAnswers.salary, parseInt(roleAnswers.department_id));
        break;
      case 'Add an employee':
        const employeeAnswers = await inquirer.prompt([
          { type: 'input', name: 'first_name', message: 'Enter first name:' },
          { type: 'input', name: 'last_name', message: 'Enter last name:' },
          { type: 'input', name: 'role_id', message: 'Enter role ID:' },
          { type: 'input', name: 'manager_id', message: 'Enter manager ID (or leave blank if none):' },
        ]);
        const role_id = parseInt(employeeAnswers.role_id);
        let manager_id = employeeAnswers.manager_id === '' ? null : parseInt(employeeAnswers.manager_id);
        await addEmployee(employeeAnswers.first_name, employeeAnswers.last_name, role_id, manager_id);
        break;
      case 'Update employee role':
        const updateRoleAnswers = await inquirer.prompt([
          { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
          { type: 'input', name: 'role_id', message: 'Enter new role ID:' },
        ]);
        await updateEmployeeRole(updateRoleAnswers.employee_id, updateRoleAnswers.role_id);
        break;
      case 'Update employee manager':
        const updateManagerAnswers = await inquirer.prompt([
          { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
          { type: 'input', name: 'manager_id', message: 'Enter new manager ID:' },
        ]);
        await updateEmployeeManager(updateManagerAnswers.employee_id, updateManagerAnswers.manager_id);
        break;
      case 'View employees by manager':
        const { manager_id: viewManagerId } = await inquirer.prompt([{ type: 'input', name: 'manager_id', message: 'Enter manager ID:' }]);
        await viewEmployeesByManager(viewManagerId);
        break;
      case 'Delete a department':
        const { id: depId } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'Enter department ID:' }]);
        await deleteDepartment(depId);
        break;
      case 'Delete a role':
        const { id: roleId } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'Enter role ID:' }]);
        await deleteRole(roleId);
        break;
      case 'Delete an employee':
        const { id: empId } = await inquirer.prompt([{ type: 'input', name: 'id', message: 'Enter employee ID:' }]);
        await deleteEmployee(empId);
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }

    // Pause after action
    await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);
  } catch (error) {
    console.error('An error occurred:', error);
  }

  await showMenu();
}

showMenu();
