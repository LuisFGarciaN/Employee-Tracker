const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KhDFmdW6317.",
  database: "employee_tracker",
});

const printDivider = () => {
  console.log("==========================================");
};

const printDots = () => {
  console.log(".");
  console.log(".");
  console.log(".");
};

const printWelcomeMessage = () => {
  printDivider();
  console.log("|| Connected to employee_tracker ||");
  printDivider();
};

const printGoodbyeMessage = () => {
  console.log("Goodbye!\n");
  process.exit(0);
};

const viewDepartments = () => {
  connection.query("SELECT * FROM departments", (err, data) => {
    console.table(data);
    mainMenu();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM roles", (err, data) => {
    console.table(data);
    mainMenu();
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employees", (err, data) => {
    console.table(data);
    mainMenu();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Employee's First Name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Employee's Last Name: ",
      },
      {
        type: "number",
        name: "roleId",
        message: "Employee's Role ID: ",
      },
    ])
    .then((answer) => {
      let query = `INSERT INTO employees SET ?`;
      connection.query(
        query,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
        },
        (err, res) => {
          if (err) throw err;
          mainMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Role Title: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Role Salary: ",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Role Department ID: ",
      },
    ])
    .then((answer) => {
      let query = `INSERT INTO roles SET ?`;
      connection.query(
        query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId,
        },
        (err, res) => {
          if (err) throw err;
          mainMenu();
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Department's Name: ",
      },
    ])
    .then((answer) => {
      let query = `INSERT INTO departments SET ?`;
      connection.query(
        query,
            {
                name: answer.department,
            },
        (err, res) => {
         if (err) throw err;
            mainMenu();
            }
        );
    });
};

const mainMenu = () =>{
    printDivider();
    inquirer
    .prompt([
        {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Exit",
            ],
        },
    ])
    .then((answer)=>{
        switch(answer.choice) {
            case "View Departments":
                viewDepartments();
            break;
            case "View Roles":
                viewRoles();
            break;
            case "View Employees":
                viewEmployees();
            break;
            case "Add Department":
                addDepartment();
            break;
            case "Add Role":
                addRole();
            break;
            case "Add Employee":
                addEmployee();
            break;
            case "Exit":
                printGoodbyeMessage();
            break;
            default:
                console.log("Invalid choice. Please try again.");
                mainMenu();
        }
    });
};
    
connection.connect((err) => {
    if (err) throw err;
        printWelcomeMessage();
        mainMenu();
    });
