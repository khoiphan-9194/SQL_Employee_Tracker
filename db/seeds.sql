-- seed database
INSERT INTO department (dept_name)
VALUES 
("Sales"), 
("Marketing"),
("Engineering"),
("Finance"),
("Information Technology"),
("Chief Management");



INSERT INTO role (title,salary,department_id)
VALUES  ("Engineering Manager", 120000, 3),
        ("Engineering Lead", 100000, 3),
        ("Staff Engineer", 80000, 3),
        ("Finance Manager", 85000, 4),
        ("Financial Analyst", 75000, 4),
        ("Accountant", 70000, 4),
        ("Desktop Support", 95000, 5),
        ("System Engineer", 122000, 5),
        ("Networking Analyst", 70000, 5),
        ("Sales Manager", 75000, 1),
        ("Salesperson", 65000, 1),
        ("Cyber Security Consultant", 110000, 5),
        ("Strategic Marketing", 95000, 2),
        ("Multimedia Coordinator", 105000, 2),
        ("Chief Execution Operation",700000,6),
        ("Regional Executive Director",600000,6);




INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Jason", "Phan",15, NULL),
        ("Jessica", "Tran",16, NULL), 
        ("Jane", "Dove", 4, 16),
        ("Khang", "Nguyen", 3, 2), 
        ("Tina", "Huynh", 1, 15),
        ("Richard", "Robin", 7, 8), 
        ("Tahashahi", "Op", 12, 16), 
        ("Juhi", "Dave", 13, 15), 
        ("Jin", "Dai", 11, 10), 
        ("He", "Park", 10, 16), 
        ("Jocelyn", "Davalos", 12, 15),
        ("Teresa", "Cheng", 6, 4), 
        ("Rishi", "Singh", 9, 8),  
        ("William", "Morgan",  14, 13),
        ("Leonard","Davanci",8, 16),
        ("Long","Phan",2, 1);