-- These are some Database Manipulation queries for the Tropical Fish Emporium database 
--  ':' denotes a variable

-- SELECTS
    -- CUSTOMERS 
    -- search by firstName, lastName and/or email
SELECT * FROM customers WHERE (firstName LIKE :fname OR lastName LIKE :lname OR email LIKE :cus_email) AND firstName IS NOT NULL AND lastName IS NOT NULL;
    -- See all customers 
SELECT * FROM customers;
    -- For the dynamically populated drop down list of customers when adding a sale
    -- get all customerIDs, firstNames and lastNames from Customers
    -- ignores cases where the names are NULL
SELECT customerID, firstName, lastName FROM customers WHERE lastName IS NOT NULL;

    -- EMPLOYEES
    -- search by firstName, lastName, title, shift start/stop times, hourly rate or part-time status
SELECT * FROM employees WHERE firstName LIKE :fname OR lastName LIKE :lname OR title LIKE :emp_title OR startTime LIKE :shiftStart OR stopTime LIKE :shiftStop OR hourlyRate LIKE :hrate OR partTime LIKE :pTime;
    -- See all employees 
SELECT * FROM employees;

    -- SALES 
    -- search by saleId, employeeId, customerID, transactionDate, and/or purchaseTotal
SELECT * FROM sales WHERE saleId LIKE :sale_id OR employeeId LIKE :emp_id OR customerId LIKE :cust_id OR transactionDate LIKE :t_date OR totalPurchase LIKE :t_purchase;
    -- See all sales 
SELECT * FROM sales;
    -- SALES_PRODUCTS (by sale ID)
SELECT * FROM sales_products WHERE saleId LIKE :sale_id;

    -- PRODUCTS 
    -- search by productId, productName, and/or price
SELECT * FROM products WHERE productId LIKE :prod_id OR name LIKE :p_name OR price LIKE :p_price;
    -- See all products 
SELECT * FROM products;
    -- SALES_PRODUCTS (by product ID)
SELECT * FROM sales_products WHERE productId LIKE :prod_id;

-- UPDATE (an employee)
UPDATE employees SET firstName = :fname_in, lastName = :lname_in, title = :title_in, startTime = :start_in, stopTime = :stop_in, hourlyRate = :rate_in, partTime = :pTime_in WHERE id= :selected_emp_id;

-- DELETES
    -- CUSTOMERS
DELETE FROM customers WHERE id = :selected_cust_id;

    -- EMPLOYEES
DELETE FROM employees WHERE id = :selected_emp_id;

    -- SALES
DELETE FROM sales WHERE id = :selected_sale_id;
    
    -- PRODUCTS
DELETE FROM products WHERE id = :selected_prod_id;

    -- SALES PRODUCTS
DELETE FROM sales_products WHERE id = :selected_prod_id OR id = :selected_sale_id;

-- INSERTS
    -- CUSTOMERS
INSERT INTO customers (email, memberSince, firstName, lastName) VALUES (:email_in, :date_in:, :fname_in, :lname_in);
    -- EMPLOYEES
INSERT INTO employees (firstName, lastName, storeID, title, startTime, stopTime, hourlyRate, partTime) VALUES (:fname_in, :lname_in, :store_in, :title_in, :start_in. :stop_in, :rate_in, :ptime);
    -- PRODUCTS
INSERT INTO products (name, price) VALUES (:name_in, :price_in);
    -- SALES
INSERT INTO sales (employeeId, customerId, transactionDate, totalPurchase) VALUES (:empid_in, :custid_in, :date_in, :total_in);

    -- SALES_PRODUCTS
    -- When a sale is made, the saleId, product ID and quantities of each product (number) will be entered into the sales_products table.
INSERT INTO sales_products (saleId, productId, number) VALUES (:sale_id_in, :product_id_in, :quantity_in);
