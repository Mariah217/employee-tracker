const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./config/connection")
require("console.table");
const employeeArray = [];

db.connect(() => {
    menu();
})

const menuQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
        name: 'menu'
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

const updateEmployeeQuestions = [
    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: ['Hope McCrea', 'Mel Monroe', 'Jack Sheridan', 'Charmaine Roberts', 'Vernon Mullins', 'Dan Brady', 'Cameron Hayek', 'Joey Barnes'],
        name: 'update'
    },
    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service'],
        name: 'updateRole'
    },
]

//function to initiate questions
function menu() {
    inquirer
        .prompt(menuQuestion)
        .then(response => {
            if (response.menu === "View All Employees") {
                viewEmployees() 
            } 
            else if (response.menu === "View All Departments") {
                viewDepartments() 
            } 
            else if (response.menu === "Add Employee") {
                addEmployee()
            }
        })
}

//function to view all dept's
function viewDepartments(){
    db.query("select * from department", (err,data) =>{
        console.table(data)
        menu()
    })
}

//function to view all roles

//function to view all employees
function viewEmployees() {
    db.query(`
    select * from department;
    select * from role;
    SELECT employee.id,
    employee.first_name, 
    employee.last_name
    role.title, 
    department.name as department, --as renames 
    role.salary, 
    CONCAT(mgr.first_name, " ", mgr.last_name) as manager
    FROM employee
    LEFT JOIN role ON  role.id=employee.role_id
    LEFT JOIN department ON role.department_id=department.id
    LEFT JOIN employee as mgr ON employee.manger_id = mgr.id
    `, (err, data) => {
        console.table(data)
        menu()
    })
}

//function to add a dept

//function to add a role

//function to add employee
function addEmployee() {
    db.query("select title as name, id as value from role", (err, roleData) => {

        db.query(`select CONCAT(firstName, " ", lastName) as name, id as value from employee where manager_id is null`, (err, managerData) => {
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
                    choices: roleData,
                    name: 'role_id'
                },
                {
                    type: 'list',
                    message: "Who is the employee's manager?",
                    Choices: managerData,
                    name: 'manager_id'
                }
            ]
            inquirer.prompt(addEmployeeQuestions)
                .then(response => {
                    const parameters = [response.firstName, response.lastName, response.role_id, response.manager_id]
                    db.query("INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES(?,?,?,?)", parameters, (err, data) => {
                        viewEmployees()
                    })
                })
        })
    })
}

//function to update an employee

