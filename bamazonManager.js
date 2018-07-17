var mysql = require('mysql')
var inquirer = require('inquirer')
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    manager()
});

function manager() {
    inquirer.prompt([
        {
            name: "menu",
            message: 'What would you like to do?',
            type: "list",
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function (answers) {
        var toDo = answers.menu
        if (toDo == 'View Products for Sale') {
            viewProducts()
        }
        else if (toDo == 'View Low Inventory') {
            lowInventory()
        }
        else if (toDo == 'Add to Inventory') {
            addInventory()
        }
        else {
            addProduct()
        }

    })
}

function viewProducts() {
    connection.query('select * from products', function (err, res) {
        if (err) throw err
        console.table(res)
        manager()
    })
}
function lowInventory() {
    connection.query('select * from products', function (err, res) {
        if (err) throw err
        result = res
    
    for(i=0; i<result.length; i++){
        if(result[i].stock_quantity<5){
        connection.query('select * from products where ? ', [
            { item_id: result[i].item_id}
        ], function (error, response) {
            if (error) throw error
            console.table(response)
        })}}})
            setTimeout(function(){manager()},1500)
        
    }
function addInventory() {
            connection.query('select * from products', function (err, res) {
                if (err) throw err
                console.table(res)
                resLength = res.length
                table = res
                inquirer.prompt([{
                    name: 'update',
                    message: 'What is the item_id of the item would you like to add inventory of? (Q to quit) ',
                    type: 'input',
                    validate: function (input) {
                        if (input.length > 0 && input <= resLength) {
                            console.log('Thanks for answering')
                            return true
                        }
                        else if (input == "Q") { quit() }
                        else {
                            console.log(' is not a valid answer')
                            return false

                        }
                    }
                }]).then(function (answer) {
                    var itemToAdd = parseInt(answer.update)
                    console.table(table[itemToAdd - 1])
                    inquirer.prompt([{
                        name: 'amount',
                        message: 'How much would you like to add?',
                        type: 'input',
                        validate: function (input) {
                            if (input.length > 0 && input > 0) {
                                return true
                            }
                            else {

                                console.log(' is not a valid number')
                                return false
                            }
                        }
                    }]).then(function (answers2) {
                        var amount = parseInt(answers2.amount)
                        connection.query('update products set ? where ?', [
                            { stock_quantity: (table[itemToAdd - 1].stock_quantity) + amount },
                            { item_id: table[itemToAdd - 1].item_id }
                        ])
                        setTimeout(function(){manager()},1500)                    })
                })
            })
        }

function addProduct() {
            inquirer.prompt([{
                name: "itemName",
                message: 'What is the name of the item you would like to add',
                type: 'input'
            },
            {
                name: 'department',
                message: 'What department does this item belong to?',
                type: 'input'
            },
            {
                name: 'amount',
                message: 'How many of this item are we adding?',
                type: 'input',
                validate: function (input) {
                    if (input.length > 0 && input > 0) {
                        return true
                    }
                    else {

                        console.log(' is not a valid number')
                        return false
                    }
                }
            },
            {
                name: 'price',
                message: 'How much does each one cost the consumer?',
                type: 'input'

            }
            ]).then(function (answers3) {
                connection.query("INSERT INTO products SET ?", [
                    {
                        product_name: answers3.itemName,
                        department_name: answers3.department,
                        price: answers3.price,
                        stock_quantity: answers3.amount
                    }

                ], function (err, res) {
                    console.log(res.affectedRows + " product inserted!\n");
                })
                setTimeout(function(){manager()},1500)            })
        }
        function quit(){
            connection.end()
            process.kill(process.pid)
        }