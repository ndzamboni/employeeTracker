import client from '../db/db.mjs';
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function viewAllRoles() {
  try {
    const res = await client.query(`
      SELECT role.id, role.title, role.salary, department.name AS department 
      FROM role 
      JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
  } catch (err) {
    console.error(chalk.red('Error fetching roles:', err));
  }
}

export async function addRole() {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:',
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID:',
    }
  ]);

  try {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    console.log(chalk.green('Role added successfully.'));
  } catch (err) {
    console.error(chalk.red('Error adding role:', err));
  }
}

export async function updateRole() {
  const roles = await client.query('SELECT id, title FROM role');
  const departments = await client.query('SELECT id, name FROM department');

  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role to update:',
      choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
    }
  ]);

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the new role title:',
      default: roles.rows.find(role => role.id === roleId).title
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the new role salary:'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the new department:',
      choices: departments.rows.map(department => ({ name: department.name, value: department.id }))
    }
  ]);

  try {
    await client.query('UPDATE role SET title = $1, salary = $2, department_id = $3 WHERE id = $4', [title, salary, departmentId, roleId]);
    console.log(chalk.green('Role updated successfully.'));
  } catch (err) {
    console.error(chalk.red('Error updating role:', err));
  }
}
