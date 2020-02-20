--DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  employeeID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  storeID int(11),
  title varchar(255) NOT NULL,
  startTime time NOT NULL,
  stopTime time NOT NULL,
  hourlyRate float NOT NULL,
  partTime boolean NOT NULL
) ENGINE = INNODB;


--DROP TABLE IF EXISTS products
CREATE TABLE products (
  productID int(11) PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  price float NOT NULL
) ENGINE = INNODB;


--DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  customerID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email varchar(255) UNIQUE,
  memberSince date,
  firstName varchar(255),
  lastName varchar(255),
  CONSTRAINT fullName UNIQUE (firstName, lastName)
) ENGINE = INNODB;

--DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
  saleID int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  eID int(11),
  cID int(11),
  transactionDate date NOT NULL,
  totalPurchase float NOT NULL,
  FOREIGN KEY (eID) REFERENCES employees (employeeID),
  FOREIGN KEY (cID) REFERENCES customers (customerID)
) ENGINE = INNODB;

--DROP TABLE IF EXISTS sales_products
CREATE TABLE sales_products (
  sID int(11) NOT NULL,
  pID int(11) NOT NULL,
  number int(100) NOT NULL,
  FOREIGN KEY (sID) REFERENCES sales (saleID),
  FOREIGN KEY (pID) REFERENCES products (productID),
  PRIMARY KEY (sID, pID)
) ENGINE = INNODB;
