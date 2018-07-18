var mysql= require('mysql')
var inquirer= require('inquirer')
var cTable = require('console.table');

var connection= mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  function start(){
      inquirer.prompt([
          {
              name: 'toDo',
              message: 'What do you want to do?',
              type: 'list',
              choices: ["View product sales by department", "Create new department"]
          }
      ]).then(function(answer){
            if (answer.toDo== 'View product sales by department'){
                connection.query('select departments.department_id, departments.department_name, departments.overhead_cost, max(products.product_sales) as product_sales, max(products.product_sales-departments.overhead_cost) as total_profit from departments join products on departments.department_name=products.department_name group by departments.department_id', 
                function(err,res){
                    if (err) throw err
                    console.table(res)
                    setTimeout(function(){start()}, 2000)
                }
            )
            }
            else{
                createDepartment()
            }

      })
  }
  setTimeout(function(){start()}, 500)


  function createDepartment(){
      inquirer.prompt([
          {
              name: 'name',
              message: 'Name the new department',
              type: 'input'
          },
          {
              name: 'overhead',
              message: 'What is the overhead cost of this department?',
              type: 'input'
          }
      ]).then(function(answer2){
            connection.query('insert into departments set ?',
            [{
                department_name: answer2.name,
                overhead_cost: answer2.overhead
            }
            ],function(err,res){
                if(err) throw err
                console.table(res)
                console.log('This was added to departments table in bamazon database')
                setTimeout(function(){start()}, 2000)

            }
        )
      })
  }