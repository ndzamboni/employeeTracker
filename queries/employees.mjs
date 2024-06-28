import client from '../config/connection.js';
import 'console.table';

export async function viewAllEmployees() {
  try {
    console.log('Fetching all employees...');
    const res = await client.query('SELECT * FROM employee');
    console.log('Query result:', res);
    if (res.rows.length === 0) {
      console.log('No employees found.');
    } else {
      console.table(res.rows);
    }
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}

export async function addEmployee(first_name, last_name, role_id, manager_id) {
  try {
    console.log(`Adding employee: ${first_name} ${last_name}`);
    const res = await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
    console.log('Employee added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

export async function updateEmployeeRole(employee_id, role_id) {
  try {
    console.log(`Updating employee ID ${employee_id} with new role ID ${role_id}`);
    const res = await client.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, employee_id]);
    console.log('Employee role updated:', res.rows[0]);
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

export async function updateEmployeeManager(employee_id, manager_id) {
  try {
    console.log(`Updating employee ID ${employee_id} with new manager ID ${manager_id}`);
    const res = await client.query('UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *', [manager_id, employee_id]);
    console.log('Employee manager updated:', res.rows[0]);
  } catch (err) {
    console.error('Error updating employee manager:', err);
  }
}

export async function viewEmployeesByManager(manager_id) {
  try {
    console.log(`Fetching employees managed by manager ID ${manager_id}`);
    const res = await client.query('SELECT * FROM employee WHERE manager_id = $1', [manager_id]);
    console.log('Query result:', res);
    if (res.rows.length === 0) {
      console.log('No employees found for this manager.');
    } else {
      console.table(res.rows);
    }
  } catch (err) {
    console.error('Error fetching employees by manager:', err);
  }
}

export async function deleteEmployee(id) {
  try {
    console.log(`Deleting employee with ID: ${id}`);
    const res = await client.query('DELETE FROM employee WHERE id = $1 RETURNING *', [id]);
    console.log('Employee deleted:', res.rows[0]);
  } catch (err) {
    console.error('Error deleting employee:', err);
  }
}
