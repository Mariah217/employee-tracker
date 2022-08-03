USE employees_db;

INSERT INTO department (name)
VALUES  ("Engineering"), 
        ("Finance"), 
        ("Legal"), 
        ("Sales"), 
        ("Service");

INSERT INTO role (title,salary,department_id)
VALUES  ("Sales Lead", 100000, 4),
        ("Salesperson", 80000, 4),
        ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3),
        ("Customer Service", 80000, 5);

INSERT INTO employee (first_name,last_name,role_id)
VALUES  ("Hope", "McCrea", 1),
        ("Mel", "Monroe", 2),
        ("Jack", "Sheridan", 3),
        ("Charmaine", "Roberts", 4),
        ("Vernon", "Mullins", 5),
        ("Dan", "Brady", 6),
        ("Cameron", "Hayek", 7),
        ("Joey", "Barnes", 8);

UPDATE employee SET manager_id=1 WHERE id=2;