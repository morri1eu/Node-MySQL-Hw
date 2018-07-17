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
var resLength;
var table;
function runBamazon(){
  connection.query('select * from products',function(err, res){
    if (err) throw err
    resLength=res.length
    console.log(resLength)
    console.table(res)
    table=res
    customerInquiry()
    
  })}
  
  function customerInquiry(){
      inquirer.prompt([{
          name: "id",
          message:"What is the ID of the item you'd like to buy? (Enter Q to Exit)",
          type: 'input',
          validate: function(input){
              if (input.length>0 && input<= resLength){
                  console.log('Thanks for answering')
                  return true
              }
              else if(input== "Q")
              {quit()}
              else{
                console.log(' is not a valid answer')  
                return false

              }
          }
      }]).then(function(answer){
            var itemToBuy= parseInt(answer.id)
            console.table(table[itemToBuy-1])
            inquirer.prompt([{
                name: 'amount',
                message: "How many would you like to purchase",
                type: 'input',
                validate: function(input1){
                    if (input1> table[itemToBuy-1].stock_quantity){
                        console.log('')
                        console.log('Insufficient Quantity')
                        return false
                    }
                    else{
                        return true
                    }
                }
            }]).then(function(answer1){
                var amountToBuy= parseInt(answer1.amount)
                connection.query('update products set ? where ?',
                [
                    {stock_quantity: (table[itemToBuy-1].stock_quantity)-amountToBuy},
                    {item_id: table[itemToBuy-1].item_id}
                ], 
                function(err,res){
                    if (err) throw err
                    console.log(res.affectedRows+ 'products updated')
                    console.log("This purchase cost $"+ (amountToBuy*table[itemToBuy-1].price) )
                setTimeout(function(){runBamazon()}, 3000)
            }
            )
            })
      })
      
    }

    function quit(){
        connection.end()
        process.kill(process.pid)
    }
  
runBamazon()