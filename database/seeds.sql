INSERT INTO departments (id, department)
VALUES  (0, "Finance"),
        (1, "Sales"),
        (2, "Engineering");

INSERT INTO employee_roles (id, title, salary, department_id)
VALUES  (200, "Lead Software Engineer", 110000, 2),
        (201, "Software Engineer", 50000, 2),
        (100, "Lead Salesperson", 70000, 1),
        (101, "Salesperson", 40000, 1),
        (000, "Financial Lead", 100000, 0),
        (001, "Accounts Assistant", 40000, 0 );


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Smith", 200, NULL),
        ("Mark", "Hamill", 201, 1),
        ("Carrie", "Fischer", 100, NULL),
        ("George", "Ford", 101, 3),
        ("Henry", "Milton", 000, NULL),
        ("Arthur", "Morgan", 001, 5);
        
