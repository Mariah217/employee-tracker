const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const question = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
        name: 'todo'
    },
]

const addADeptQuestion = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDept'
    },
]

const addRoleQuestions = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'addRole'
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'addSalary'
    },
    {
        type: 'list',
        message: 'Which department does this role belong to?',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service',],
        name: 'addDeptRole'
    },
]

const addEmployeeQuestions = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName'
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service'],
        name: 'employeeRole'
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        Choices: ['Jane Austin', 'Robert Smith', 'Anna Delgado', 'Jimmy Keen', 'Mike Barley', 'Shana DeWitt'],
        name: 'manager'
    },
]

const updateEmployeeQuestions = [
    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: ['Hope McCrea', 'Mel Monroe', 'Jack Sheridan', 'Charmaine Roberts', 'Vernon Miller', 'Dan Brady', 'Cameron Hayek', 'Joey Barnes'],
        name: 'update'
    },
    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service'],
        name: 'updateRole'
    },
]