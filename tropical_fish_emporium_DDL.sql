-- EMPLOYEES ~~
DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  employeeID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  storeID int(11),
  title varchar(255) NOT NULL,
  startTime time NOT NULL,
  stopTime time NOT NULL,
  hourlyRate decimal(16,2) NOT NULL,
  partTime boolean NOT NULL,
  firstName varchar(255),
  lastName varchar(255),
  CONSTRAINT fullName UNIQUE (firstName, lastName)
) ENGINE = INNODB;
ALTER TABLE employees AUTO_INCREMENT=2000;

LOCK TABLES employees WRITE;
INSERT INTO employees (storeID, title, startTime, stopTime, hourlyRate, partTime, firstName, lastName) VALUES
(103,'Assistant Manager','9:30','1:00',20.00,0,'Salane','Foster'),
(101,'Cashier','1:00','5:30',12.50,1,'Silver','Craig'),
(103,'Fish Specialist','8:00','1:30',14.50,1,'Dave','Murray'),
(102,'Manager','11:30','4:30',30.00,0,'Freddie','Thompson');
UNLOCK TABLES;

-- PRODUCTS ~~
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  productID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  price decimal(16,2) NOT NULL
) ENGINE = INNODB;
ALTER TABLE products AUTO_INCREMENT=3000;

LOCK TABLES products WRITE;
INSERT INTO products (name, price) VALUES
('Fish Food - 1 lb',41.90),
('Clownfish',60.02),
('10 Gallon Tank',10.19),
('Queen Anglefish',53.98),
('Megamouth Shark',11.70),
('Starfish',35.86),
('Scuba Diver Model',34.35);
UNLOCK TABLES;

-- CUSTOMERS ~~
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  customerID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email varchar(255) UNIQUE,
  memberSince date NOT NULL,
  firstName varchar(255),
  lastName varchar(255),
  CONSTRAINT custFullName UNIQUE (firstName, lastName)
) ENGINE = INNODB;
ALTER TABLE customers AUTO_INCREMENT=1000;

LOCK TABLES customers WRITE;
INSERT INTO customers (email, memberSince, firstName, lastName) VALUES
('m.elliott@randatmail.com','2018-2-15','Michelle','Elliott'),
('r.robinson@randatmail.com','2011-1-21','Robert','Robinson'),
('a.hunt@randatmail.com','2017-8-30','Alina','Hunt'),
('l.richardson@randatmail.com','2013-11-14','Luke','Richardson');
UNLOCK TABLES;

-- SALESS ~~
DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  saleID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  eID int(11),
  cID int(11),
  transactionDate date NOT NULL,
  totalPurchase decimal(16,2) NOT NULL,
  FOREIGN KEY (eID) REFERENCES employees (employeeID),
  FOREIGN KEY (cID) REFERENCES customers (customerID)
) ENGINE = INNODB;
ALTER TABLE sales AUTO_INCREMENT=4000;

LOCK TABLES sales WRITE;
INSERT INTO sales (eID, cID, transactionDate, totalPurchase) VALUES
(2002,1001,'2018-1-11',60.02),
(2001,1000,'2018-2-6',83.80),
(2001,1003,'2016-12-6',106.79),
(2003,1002,'2018-2-22',20.38),
(2002,1002,'2017-8-29',24.99),
(2000,1003,'2018-2-26',284.98);
UNLOCK TABLES;

-- SALES_PRODUCTS ~~
DROP TABLE IF EXISTS sales_products;
CREATE TABLE sales_products (
  sID int(11) NOT NULL,
  pID int(11) NOT NULL,
  number int(100) NOT NULL,
  FOREIGN KEY (sID) REFERENCES sales (saleID),
  FOREIGN KEY (pID) REFERENCES products (productID),
  PRIMARY KEY (sID, pID)
) ENGINE = INNODB;

LOCK TABLES sales_products WRITE;
INSERT INTO sales_products (sID, pID, number)VALUES
(4001,3000,2),
(4000,3001,1),
(4003,3002,2),
(4005,3003,2),
(4005,3004,9),
(4005,3005,2),
(4002,3006,1),
(4002,3000,1),
(4004,3002,1),
(4004,3003,2);
UNLOCK TABLES;
