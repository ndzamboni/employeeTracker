// roles.mjs
import db from '../db/db.mjs';
import inquirer from 'inquirer';

export async function viewAllRoles() {
  const res = await db.query(
    `SELECT role.id, role.title, department.name AS department, role.salary 
     FROM role 
     JOIN department ON role.department_id = department.id`
  );
  console.table(res.rows);
}

export async function addRole() {
  const departments = await db.query('SELECT * FROM department');
  const departmentChoices = departments.rows.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const answers = await inquirer.prompt([
    {
      name: 'title',
      message: 'Enter the name of the role:',
    },
    {
      name: 'salary',
      message: 'Enter the salary for the role:',
      validate: (value) => !isNaN(value) || 'Please enter a number',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for this role:',
      choices: departmentChoices,
    },
  ]);

  await db.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [answers.title, answers.salary, answers.department_id]
  );
  console.log(`Added role ${answers.title}`);
}
