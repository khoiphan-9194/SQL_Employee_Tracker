DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;
-- Create table department
CREATE TABLE department (

    -- Create unique id for each item
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    -- Set col dept_name to accept variable-length strings of max 30 characters, where data feild recieved cannot be empty
    dept_name VARCHAR(30) NOT NULL

  
);




-- Create table roles
create table role (

    -- Create unique id for each item
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    --  Set col title to accept variable-length strings of max 30 characters, where data feild recieved cannot be empty
    title VARCHAR(30) NOT NULL,

    -- Set col salary to accept decimal numberical values, where data feild recieved cannot be empty
    salary DECIMAL NOT NULL,

    -- Set col department_id to accept only integers, where data feild recieved cannot be empty
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL


);


-- Create table employee
CREATE TABLE employees (

    -- Create unique id for each item
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    -- Set col first_name to accept variable-length strings of max 30 characters, where data feild recieved cannot be empty
    first_name VARCHAR(30) NOT NULL,

    -- Set col last_name to accept variable-length strings of max 30 characters, where data feild recieved can be empty
    last_name VARCHAR(30) NOT NULL,
    
    -- Set col role_id to accept only integers, where data feild recieved cannot be empty
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,


    -- Set col manager_id to accept only integers, where data feild recieved cannot be empty
    manager_id INT,
    FOREIGN KEY(manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);
