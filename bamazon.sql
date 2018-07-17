DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT,
product_name VARCHAR(30) not null,
department_name VARCHAR(30) not null,
price decimal(10,2),
stock_quantity INTEGER(11),
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Lego Batman", "Movies", 9.99, 100);

 INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Skyrim", "Video Games", 19.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Toilet Paper", "Household Goods", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Lego Movie", "Movies", 6.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Protein Powder", "Supplements", 24.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Avocado", "Food", 0.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Salsa", "Food", 2.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Windex", "Household Goods", 3.99, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Airborne", "Supplements", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Fallout 4", "Video Games", 29.99, 100);

select * from products
