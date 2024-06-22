import inquirer from 'inquirer';
import client from '../db/db.mjs';
import { addRole } from './roles.mjs';
import { addDepartment } from './departments.mjs';

async function checkForEmptyTable(tableName, addFunction, message) {
  const res = await client.query(`SELECT * FROM ${tableName}`);
  if (res.rows.length === 0) {
    console.log(message);
    await addFunction();
    return await client.query(`SELECT * FROM ${tableName}`);
  }
  return res;
}

export async function viewAllEmployees() {
  try {
    const res = await client.query(`
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `);
    if (res.rows.length === 0) {
      console.log('No employees found. Please add an employee.');
      await addEmployee();
    } else {
      console.table(res.rows);
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

export async function addEmployee() {
  try {
    let rolesRes = await checkForEmptyTable('role', addRole, 'No roles found. Please add a role.');
    const roles = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));

    let departmentsRes = await checkForEmptyTable('department', addDepartment, 'No departments found. Please add a department.');
    const departments = departmentsRes.rows.map(dep => ({ name: dep.name, value: dep.id }));

    let employeesRes = await client.query('SELECT * FROM employee');
    const managers = employeesRes.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    managers.unshift({ name: 'None', value: null });

    const answers = await inquirer.prompt([
      { type: 'input', name: 'first_name', message: 'Enter first name:' },
      { type: 'input', name: 'last_name', message: 'Enter last name:' },
      { type: 'list', name: 'role_id', message: 'Select role:', choices: roles },
      { type: 'list', name: 'manager_id', message: 'Select manager:', choices: managers }
    ]);

    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
      [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
    console.log('Employee added successfully.');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

export async function updateEmployeeRole() {
  const employeesRes = await client.query('SELECT * FROM employee');
  if (employeesRes.rows.length === 0) {
    console.log('No employees found. Please add an employee.');
    await addEmployee();
    return;
  }

  const employees = employeesRes.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

  const rolesRes = await client.query('SELECT * FROM role');
  if (rolesRes.rows.length === 0) {
    console.log('No roles found. Please add a role.');
    await addRole();
    return;
  }

  const roles = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));

  const { employeeId, roleId } = await inquirer.prompt([
    { type: 'list', name: 'employeeId', message: 'Select an employee:', choices: employees },
    { type: 'list', name: 'roleId', message: 'Select a new role:', choices: roles }
  ]);

  try {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    console.log('Employee role updated successfully.');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}
