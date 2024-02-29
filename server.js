const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
roleChoices=[];
empChoices=["0-NONE"];
deptChoices=[];
queryRole_DB();
queryDept_DB();
queryEmployee_DB();
startScreen();


//This function will start off the application
function startScreen() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "View Budget by Department",
        "Delete an Employee",
        "Delete a Department",
        "Delete a Role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"

    })
    .then(function(result) {
    // console.log("You entered: " + result.option);
    // create a switch to allow user choose options
        switch (result.option) {
          case "View All Employees":
                seeALL();
                break;
          case "Add Employee":
                addEmployee();
                break;
          case "Update Employee Role":
                updateRole();
                break;
          case "View All Roles":
                viewAllRole();
                break;
          case "Add Role":
                addRole();
                break;
          case "View All Departments":
                viewAllDEPT();
                break;
          case "Add Department":
                addDept();
                break;
          case "View Budget by Department":
                viewBudgetByDEPT();
                break;
          case "Delete an Employee":
                deleteEmployee();
                break;
          case "Delete a Department":
                deleteDept();
                break;
          case "Delete a Role":
                deleteRole();
                break;
          case "Quit":
                console.log("Program exit!!!!")
                break;
          default:
            console.log("______________");
           
        }
    });
}



//This function will display data from table  `role`
 function queryRole_DB(){  
   db.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      roleChoices.push(data[i].id + "-" + data[i].title)
    
    }    
    
 })

};

//This function will display data from table  `employees`
function queryEmployee_DB(){  
  db.query("SELECT * FROM employees", function (err, data) {
      if (err) throw err;

      for (i = 0; i < data.length; i++) {
          empChoices.push(data[i].id + "-" + data[i].first_name+" "+ data[i].last_name)
      }
  }) 
 }
//This function will display data from table  `department`
 function queryDept_DB(){
  db.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
        deptChoices.push(data[i].id + "-" + data[i].dept_name)
        
    }
  })
  }


// this function will show all departments with employee names together
function viewAllDEPT()
{
  let queryDept =`select e.first_name, e.last_name, d.dept_name as department
                  from employees e LEFT JOIN role r on r.id = e.role_id
					        RIGHT JOIN department d on d.id = r.department_id ORDER BY e.first_name ASC`;
  db.query(queryDept, function (err, results) {
    console.table(results);
    console.log(`---------------------------------------------------------------`);
    setTimeout(() => {
    startScreen();
      }, 3000)
  });
}

// this function will show all roles with department names together
function viewAllRole()
{
  let queryRole =`select r.id, r.title, d.dept_name as department, r.salary
                  from role r LEFT JOIN department d on r.department_id = d.id ORDER BY r.title ASC`;
                    db.query(queryRole, function (err, results) {
                    console.table(results);
                    console.log(`---------------------------------------------------------------`);
                    setTimeout(() => {
                      startScreen();
                      }, 3000)
                  });
         
}



function seeALL()
{
  let queryAll =`SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employees e LEFT JOIN role r on r.id = e.role_id
                LEFT JOIN department d on d.id = r.department_id
                LEFT JOIN employees m ON m.id = e.manager_id ORDER BY e.first_name ASC`;
   db.query(queryAll, function (err, results) {
   console.table(results,["id","first_name","last_name","title","salary","department","manager"]);
   console.log(`---------------------------------------------------------------`);
   setTimeout(() => {
    startScreen();
    }, 3000)
 });
}


// this function will sumarize how much budget the company paying for employees based on department
function viewBudgetByDEPT()
{
  inquirer
    .prompt([
      {
        type: "list",
        name: "dept_id",
        message: "Please! Select a department for budget inquiry",
        choices: deptChoices
      }
      
    ])
    .then(function (answer) {
    
      let getDeptBudget_id = answer.dept_id.split("-")[0];

      let queryBudget=` SELECT d.id, d.dept_name,SUM(r.salary) as total_budget
        from employees e left join role r on r.id=e.role_id
        LEFT JOIN department d  ON d.id = r.department_id WHERE d.id =${getDeptBudget_id} GROUP BY d.id`;
    
      db.query(queryBudget, function (err, results)
       { 
        if (err) throw err;
        else
        console.table(results);
        console.log(`---------------------------------------------------------------`);
        setTimeout(() => {
          startScreen();
          }, 3000)
        
      });

    });
}



// this function will add an employee into the database

function addEmployee()
{
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roleChoices
      },
      {
        type: "input",
        name: "salary",
        message: "What is the employee's salary?"
      },
      {
        type: "list",
        name: "employee_id",
        message: `Who is the employee's manager?`,
        choices: empChoices
      }
      
    ])
    .then(function (answer) {
    
      var getRole_id = answer.role_id.split("-")[0];
      var getEmployee_id =answer.employee_id.split("-")[0];
      if(getEmployee_id==0)
      {
        getEmployee_id=null;
      }
      
      
      db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, getRole_id, getEmployee_id], function (err, results)
       { 
        if (err) throw err;
        else
        db.query("UPDATE role SET salary = ? WHERE id = ?", [answer.salary,getRole_id], function (err, results) {
          if (err) throw err;
        });
        console.log(`Added ${answer.first_name} ${answer.last_name} to the database`);
        console.log(`---------------------------------------------------------------`);
        setTimeout(() => {
          startScreen();
          }, 3000)
      });

    });
}


// this function will add a new role into the database
function addRole()
{
 
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "dept_id",
        message: "Which department does the role belong to?",
        choices: deptChoices
      }
    ])
    .then(function (answer) {
    
      var getDept_id = answer.dept_id.split("-")[0];
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.roleSalary, getDept_id], function (err, results)
       { 
        if (err) throw err;
        else
        console.log(`Added ${answer.roleName} to the database`);
        console.log(`---------------------------------------------------------------`);
        setTimeout(() => {
          startScreen();
          }, 3000)
      });

    });
}




//this function will update a new role from an existing role.


function updateRole()
  {
  //  db.query('SELECT * FROM role', function (err, result) {
      inquirer.prompt([
        {
          type: "list",
          name: "employee_id",
          message: `Choose an employee in the list:`,
          choices:  empChoices
        
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role will be changed?",
          choices: roleChoices
        },
        {
          type: "input",
          name: "salaryUpdate",
          message: "What is the employee's salary?"
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's manager?",
          choices: empChoices
        }
        
      ])
      .then(function (answer) {
      
        let getRoleUpdate_id = answer.role_id.split("-")[0];
        let getEmployeeUpdate_id =answer.employee_id.split("-")[0];
        let getManagerUpdate_id =answer.manager_id.split("-")[0];
        if(getManagerUpdate_id==0)
        {
          getManagerUpdate_id=null;
        }
        db.query("UPDATE employees SET role_id = ?, manager_id =? WHERE id = ?", [getRoleUpdate_id, getManagerUpdate_id,getEmployeeUpdate_id], function (err, results)
         { 
          if (err) throw err;
          else
          db.query("UPDATE role SET salary = ? WHERE id = ?", [answer.salaryUpdate,getRoleUpdate_id], function (err, results) {
            if (err) throw err;
          });
          console.log(`Role Updated for ${answer.employee_id.split("-")[1]} to the database`);
          console.log(`---------------------------------------------------------------`);
          setTimeout(() => {
            startScreen();
            }, 3000)
        });
       
       
      });
   // })
     
  }


//this function will add a new department into the database
  function addDept()
{
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the department?"
      }
     
    ])
    .then(function (answer) {
    
     
      db.query("INSERT INTO department (dept_name) VALUES (?)", [answer.deptName], function (err, results)
       { 
        if (err) throw err;
        else
        console.log(`Added ${answer.deptName} to the database`);
        console.log(`---------------------------------------------------------------`);
        setTimeout(() => {
          startScreen();
          }, 3000)
      });

    });
}


// this function will delete an employee from the database
function deleteEmployee()
{
  inquirer
    .prompt([
      {
        type: "list",
        name: "delete_Employee",
        message: "What is the name of employee to delete off from the database?",
        choices: empChoices
      }
     
    ])
    .then(function (answer) {
    
      if(answer.delete_Employee.split("-")[0]==0)
      {
        console.log("ERROR! This cannot be deleted!!!!")
        return;
      }

      db.query("DELETE FROM employees WHERE id = (?)", [answer.delete_Employee.split("-")[0]], function (err, results)
       { 
        if (err) throw err;
        else
        console.log(`Removed ${answer.delete_Employee.split("-")[1]} to the database`);
        console.log(`---------------------------------------------------------------`);
        setTimeout(() => {
          startScreen();
          }, 3000)
      });

    });
}


// this function will delete a role from the database
function deleteRole()
{
  inquirer
    .prompt([
      {
        type: "list",
        name: "delete_Role",
        message: "What is the name of role to delete off from the database?",
        choices: roleChoices
      }
     
    ])
    .then(function (answer) {
    
      db.query("DELETE FROM role WHERE id = (?)", [answer.delete_Role.split("-")[0]], function (err, results)
       { 
        if (err) throw err;
        else
        console.log(`Removed ${answer.delete_Role.split("-")[1]} to the database`);
        console.log(`---------------------------------------------------------------`);
        setTimeout(() => {
          startScreen();
          }, 3000)
      });

    });
}

// this function will delete a department from the database
function deleteDept()
{
  inquirer
    .prompt([
      {
        type: "list",
        name: "delete_Dept",
        message: "What is the name of Department to delete off from the database?",
        choices: deptChoices
      }
     
    ])
    .then(function (answer) {
    
      db.query("DELETE FROM department WHERE id = (?)", [answer.delete_Dept.split("-")[0]], function (err, results)
       { 
        if (err) throw err;
        else
        console.log(`Removed ${answer.delete_Dept.split("-")[1]} to the database`);
        console.log(`---------------------------------------------------------------`);
        setTimeout(() => {
          startScreen();
          }, 3000)
      });

    });
}