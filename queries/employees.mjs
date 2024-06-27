import client from '../config/connection.js';
import cTable from 'console.table';

export async function viewAllEmployees() {
  try {
    const res = await client.query('SELECT * FROM employee');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}

export async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    await client.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [firstName, lastName, roleId, managerId]
    );
    console.log('Employee added successfully.');
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

export async function updateEmployeeRole(employeeId, newRoleId) {
  try {
    await client.query(
      'UPDATE employee SET role_id = $1 WHERE id = $2',
      [newRoleId, employeeId]
    );
    console.log('Employee role updated successfully.');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

export async function updateEmployeeManager(employeeId, newManagerId) {
  try {
    await client.query(
      'UPDATE employee SET manager_id = $1 WHERE id = $2',
      [newManagerId, employeeId]
    );
    console.log('Employee manager updated successfully.');
  } catch (err) {
    console.error('Error updating employee manager:', err);
  }
}

export async function viewEmployeesByManager(managerId) {
  try {
    const res = await client.query('SELECT * FROM employee WHERE manager_id = $1', [managerId]);
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching employees by manager:', err);
  }
}

export async function deleteEmployee(id) {
  try {
    await client.query('DELETE FROM employee WHERE id = $1', [id]);
    console.log('Employee deleted successfully.');
  } catch (err) {
    console.error('Error deleting employee:', err);
  }
}
