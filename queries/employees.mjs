// employees.mjs
import db from '../db/db.mjs';
import inquirer from 'inquirer';

export async function viewAllEmployees() {
  const res = await db.query(
    `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
            CONCAT(m.first_name, ' ', m.last_name) AS manager 
     FROM employee e 
     JOIN role ON e.role_id = role.id 
     JOIN department ON role.department_id = department.id 
     LEFT JOIN employee m ON e.manager_id = m.id`
  );
  console.table(res.rows);
}

export async function addEmployee() {
  const roles = await db.query('SELECT * FROM role');
  const roleChoices = roles.rows.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const employees = await db.query('SELECT * FROM employee');
  const managerChoices = employees.rows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managerChoices.unshift({ name: 'None', value: null });

  const answers = await inquirer.prompt([
    {
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for this employee:',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager for this employee:',
      choices: managerChoices,
    },
  ]);

  await db.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
  );
  console.log(`Added employee ${answers.first_name} ${answers.last_name}`);
}

export async function updateEmployeeRole() {
  const employees = await db.query('SELECT * FROM employee');
  const employeeChoices = employees.rows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const roles = await db.query('SELECT * FROM role');
  const roleChoices = roles.rows.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee to update:',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role for this employee:',
      choices: roleChoices,
    },
  ]);

  await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
    answers.role_id,
    answers.employee_id,
  ]);
  console.log(`Updated employee role`);
}
