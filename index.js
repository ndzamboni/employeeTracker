// index.js

const inquirer = require('inquirer');
const db = require('./db');
const queries = require('./queries');


async function mainMenu() {
    const answers = await inquirer.prompt([
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
                'Update an employee role',
                // Bonus features can be added here
                'Exit',
            ],
        },
    ]);

    switch (answers.action) {
        case 'View all departments':
            return queries.viewDepartments();
        case 'View all roles':
            return queries.viewRoles();
        case 'View all employees':
            return queries.viewEmployees();
        case 'Add a department':
            return queries.addDepartment();
        case 'Add a role':
            return queries.addRole();
        case 'Add an employee':
            return queries.addEmployee();
        case 'Update an employee role':
            return queries.updateEmployeeRole();
        case 'Exit':
            db.end();
            return;
    }

    mainMenu();
}

mainMenu();

