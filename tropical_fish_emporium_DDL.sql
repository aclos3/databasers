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

LOCK TABLES employees WRITE;
INSERT INTO employees VALUES
(100026,103,'Assistant Manager','9:30','1:00',20.00,0,'Salane','Foster'),
(100013,101,'Cashier','1:00','5:30',12.50,1,'Silver','Craig'),
(100111,103,'Fish Specialist','8:00','1:30',14.50,1,'Dave','Murray'),
(100001,102,'Manager','11:30','4:30',30.00,0,'Freddie','Thompson');
UNLOCK TABLES;

-- PRODUCTS ~~
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  productID int(11) PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  price decimal(16,2) NOT NULL
) ENGINE = INNODB;

LOCK TABLES products WRITE;
INSERT INTO products VALUES
(222254,'Fish Food - 1 lb',41.90),
(222262,'Clownfish',60.02),
(222232,'10 Gallon Tank',10.19),
(222288,'Queen Anglefish',53.98),
(222326,'Megamouth Shark',11.70),
(222224,'Starfish',35.86),
(222272,'Scuba Diver Model',34.35);
UNLOCK TABLES;

-- CUSTOMERS ~~
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  customerID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email varchar(255) UNIQUE,
  custFirstName varchar(255),
  custLastName varchar(255),
  CONSTRAINT fullName UNIQUE (custFirstName, custLastName)
) ENGINE = INNODB;

LOCK TABLES customers WRITE;
INSERT INTO customers VALUES
(300449,'m.elliott@randatmail.com','Michelle','Elliott'),
(301254,'r.robinson@randatmail.com','Robert','Robinson'),
(300471,'a.hunt@randatmail.com','Alina','Hunt'),
(301218,'l.richardson@randatmail.com','Luke','Richardson');
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

LOCK TABLES sales WRITE;
INSERT INTO sales VALUES
(444423,100111,301254,'2018-1-11',60.02),
(444451,100013,300449,'2018-2-6',83.80),
(444483,100001,300471,'2018-2-22',20.38),
(444496,100026,301218,'2018-2-26',284.98);
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
INSERT INTO sales_products VALUES
(444415,222254,2),
(444423,222262,1),
(444483,222232,2),
(444496,222288,2),
(444496,222326,9),
(444496,222224,2);
UNLOCK TABLES;
