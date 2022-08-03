const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./config/connection")
require("console.table");

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

//function to initiate questions
function menu() {
    inquirer
        .prompt(menuQuestion)
        .then(response => {
            if (response.menu === "View All Employees") {
                viewEmployees()
            }
            else if (response.menu === "Add Employee") {
                addEmployee()
            }
            else if (response.menu === "View All Departments") {
                viewDepartments()
            }
            else if (response.menu === "Add Department") {
                addDepartment()
            }
            else if (response.menu === "View All Roles") {
                viewRoles()
            }
            else if (response.menu === "Add Role") {
                addRole()
            }
            else if (response.menu === "Update Employee Role") {
                updateRole()
            }

        })
}

//function to view all dept's
function viewDepartments() { //need to fix, table shows 20 dept's and there is only 5???

    db.query("select * from department", (err, data) => {
        console.table(data)
        menu()
    })
}

//function to add a dept
function addDepartment() {
    db.query("select name", (err, data) => {
        const addADeptQuestion = [
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'addDept'
            },
        ]
        inquirer.prompt(addADeptQuestion)
            .then(response => {
                const parameters = [response.addDept]
                db.query("INSERT INTO department (name) VALUES(?)", parameters, (err, data) => {
                    viewDepartments()
                })
            })
    })
}

//function to view all roles
function viewRoles() {
    db.query("select * from role", (err, data) => {
        console.table(data)
        menu()
    })
}

//function to add a role
function addRole() { //prompts questions but does not add
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
            choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service'],
            name: 'addDeptRole'
        },
    ]
    inquirer.prompt(addRoleQuestions)
        .then(response => {
            const parameters = [response.addRole, response.addSalary, response.addDeptRole]
            db.query("INSERT INTO role (addRole, addSalary, addDeptRole) VALUES(?,?,?)", parameters, (err, data) => {
                viewRoles()
            })
        })
}

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

//function to add employee
function addEmployee() {
    db.query("select title as name, id as value from role", (err, roleData) => {

        db.query(`select CONCAT(first_name, " ", last_name) as name, id as value from employee where manager_id is null`, (err, managerData) => {
            const addEmployeeQuestions = [
                {
                    type: 'input',
                    message: "What is the employee's first name?",
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: "What is the employee's last name?",
                    name: 'last_name'
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
                    const parameters = [response.first_name, response.last_name, response.role_id, response.manager_id]
                    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)", parameters, (err, data) => {
                        viewEmployees()
                    })
                })
        })
    })
}

//function to update an employee
function updateRole() {
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
}
