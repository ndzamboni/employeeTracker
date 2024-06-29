import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { viewAllDepartments, addDepartment, deleteDepartment } from './queries/departments.mjs';
import { viewAllRoles, addRole, deleteRole } from './queries/roles.mjs';
import { viewAllEmployees, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, deleteEmployee, getAllRoles, getAllManagers } from './queries/employees.mjs';

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
      const { name } = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'name', 
          message: 'Enter department name:',
          validate: input => input ? true : 'This field is required.'
        }
      ]);
      await addDepartment(name);
      break;
    case 'Add a role':
      const roleAnswers = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'title', 
          message: 'Enter role title:',
          validate: input => input ? true : 'This field is required.'
        },
        { 
          type: 'input', 
          name: 'salary', 
          message: 'Enter role salary:',
          validate: input => input ? true : 'This field is required.'
        },
        { 
          type: 'input', 
          name: 'department_id', 
          message: 'Enter department ID:',
          validate: input => input ? true : 'This field is required.'
        },
      ]);
      await addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.department_id);
      break;
    case 'Add an employee':
      const roles = await getAllRoles();
      const managers = await getAllManagers();

      const employeeAnswers = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'first_name', 
          message: 'Enter first name:',
          validate: input => input ? true : 'This field is required.'
        },
        { 
          type: 'input', 
          name: 'last_name', 
          message: 'Enter last name:',
          validate: input => input ? true : 'This field is required.'
        },
        { 
          type: 'list', 
          name: 'role_id', 
          message: 'Select role:',
          choices: roles.map(role => ({ name: role.title, value: role.id })),
          validate: input => input ? true : 'This field is required.'
        },
        { 
          type: 'list', 
          name: 'manager_id', 
          message: 'Select manager:',
          choices: managers.length > 0 ? managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })).concat([{ name: 'None', value: null }]) : [{ name: 'None', value: null }]
        },
      ]);
      await addEmployee(employeeAnswers.first_name, employeeAnswers.last_name, employeeAnswers.role_id, employeeAnswers.manager_id);
      break;
    case 'Update employee role':
      const updateRoleAnswers = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'employee_id', 
          message: 'Enter employee ID:',
          validate: input => input ? true : 'This field is required.'
        },
        { 
          type: 'input', 
          name: 'role_id', 
          message: 'Enter new role ID:',
          validate: input => input ? true : 'This field is required.'
        },
      ]);
      await updateEmployeeRole(updateRoleAnswers.employee_id, updateRoleAnswers.role_id);
      break;
    case 'Update employee manager':
      const updateManagerAnswers = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'employee_id', 
          message: 'Enter employee ID:',
          validate: input => input ? true : 'This field is required.'
        },
        { 
          type: 'input', 
          name: 'manager_id', 
          message: 'Enter new manager ID:',
          validate: input => input ? true : 'This field is required.'
        },
      ]);
      await updateEmployeeManager(updateManagerAnswers.employee_id, updateManagerAnswers.manager_id);
      break;
    case 'View employees by manager':
      const { manager_id } = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'manager_id', 
          message: 'Enter manager ID:',
          validate: input => input ? true : 'This field is required.'
        }
      ]);
      await viewEmployeesByManager(manager_id);
      break;
    case 'Delete a department':
      const { id: depId } = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'id', 
          message: 'Enter department ID:',
          validate: input => input ? true : 'This field is required.'
        }
      ]);
      await deleteDepartment(depId);
      break;
    case 'Delete a role':
      const { id: roleId } = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'id', 
          message: 'Enter role ID:',
          validate: input => input ? true : 'This field is required.'
        }
      ]);
      await deleteRole(roleId);
      break;
    case 'Delete an employee':
      const { id: empId } = await inquirer.prompt([
        { 
          type: 'input', 
          name: 'id', 
          message: 'Enter employee ID:',
          validate: input => input ? true : 'This field is required.'
        }
      ]);
      await deleteEmployee(empId);
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  // Pause after action
  await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Press Enter to continue...' }]);

  await showMenu();
}

showMenu();
