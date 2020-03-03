//  Author:  Andrew Clos
//  Date:  12/6/2019
//  Title: Assignment 6: Database and UI
//  Description: This project demonstrates some simple backend database and UI interactions by tracking workouts.

const express = require('express');
const app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var Handlebars = require('handlebars');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var port = 3143;
var bClicked = "";

//set port to my default for the quarter (last four of student ID)
app.set('port', port);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

app.post('/assignCust', function (req, res) {
    bClicked = "cust";
});
app.post('/assignEmp', function (req, res) {
    bClicked = "emp";
});
app.post('/assignProd', function (req, res) {
    bClicked = "prod";
});
app.post('/assignSale', function (req, res) {
    bClicked = "sal";
});

//populate / display the table.
app.get('/', function(req, res, next){
    res.render('index', { title: 'index' ,path:"",});
});


//-- CUSTOMERS ~~
// sele vt customers
app.get('/customers', function(req, res, next){
    var context = { title: 'customers' ,path:"customers", };
    var sqlQuery = "SELECT customerID, email, memberSince, firstName, lastName FROM customers ORDER BY customerID DESC;";
    mysql.pool.query(sqlQuery, function (err, rows, fields) {
        if(err) {
            next(err);
            return;
        }
        var allCust = [];
        for(var i in rows){
            allCust.push({"id": rows[i].customerID, "email": rows[i].email, "memberSince": rows[i].memberSince, "fName": rows[i].firstName, "lName": rows[i].lastName});
        }
        context.custs = allCust;
        //console.log(JSON.stringify(context));
        res.render('customers', context);
    });
});
// insert new customer
app.post('/manager', (req, res, next) => {
    
    if(bClicked === "cust"){
        console.log("cust");
        var parametersC = [req.body.email, req.body.memberSince, req.body.custFirstName, req.body.custLastName];
        var queryResultsC = "INSERT INTO customers (email, memberSince, firstName, lastName) VALUES (?,?,?,?)";
        mysql.pool.query(queryResultsC, parametersC, function(err, rows, fields) {
        if(err) {
        next(err);
        return;
        }
        res.redirect('/manager');
        });
    }
    if (bClicked === "emp"){
        console.log("emp");
        var parametersE = [req.body.storeID, req.body.title, req.body.startTime, req.body.stopTime, req.body.hourlyRate,
            req.body.partTime, req.body.empFirstName, req.body.empLastName];
        var queryResultsE = "INSERT INTO employees (storeID, title, startTime, stopTime, hourlyRate, partTime, firstName, lastName) VALUES (?,?,?,?,?,?,?,?)";
        mysql.pool.query(queryResultsE, parametersE, function(err, rows, fields) {
            if(err) {
                next(err);
                return;
            }
            res.redirect('/manager');
            });
    }
    if (bClicked === "sal"){
        console.log("sal");
        var parametersS = [req.body.empID, '300350', req.body.transactionDate, req.body.totalPurchase];
        var queryResultsS = "INSERT INTO sales (eID, cID, transactionDate, totalPurchase) VALUES (?,?,?,?)";
        mysql.pool.query(queryResultsS, parametersS, function(err, rows, fields) {
          if(err) {
            next(err);
            return;
          }
          res.redirect('/manager');
        });
    }
    if (bClicked === "prod") {
        console.log("prod");
        var parametersP = [req.body.pName, req.body.price];
        var queryResultsP = "INSERT INTO products (name, price) VALUES (?,?)";
        mysql.pool.query(queryResultsP, parametersP, function(err, rows, fields) {
          if(err) {
            next(err);
            return;
          }
          res.redirect('/manager');
        });
    }
});

//-- EMPLOYEES ~~
// select employees
app.get('/employees', (req, res, next) => {
    var context = { title: 'employees' ,path:"employees", };
    var sqlQuery = "SELECT * FROM employees ORDER BY employeeID DESC";
    mysql.pool.query(sqlQuery, function (err, rows, fields) {
        if(err) {
            next(err);
            return;
        }
        var allEmp = [];
        for(var i in rows){
            allEmp.push({"id": rows[i].employeeID, "sID": rows[i].storeID, "title": rows[i].title, "sTime": rows[i].startTime, "stTime": rows[i].stopTime, "hRate": rows[i].hourlyRate, "pTime": rows[i].partTime, "fName": rows[i].firstName, "lname": rows[i].lastName});
        }
        context.emps = allEmp;
        //console.log(JSON.stringify(context));
        res.render('employees', context);
    });
});
// insert new employee
//app.post('/manager', (req, res, next) => {
    
//});


//-- SALES ~~
// select sales
app.get('/sales', (req, res, next) => {
    var context = { title: 'sales' ,path:"sales", };
    var sqlQuery = "SELECT * FROM sales ORDER BY saleID DESC";
    var sqlQuery2 = "SELECT * FROM sales_products ORDER BY sID DESC";
    mysql.pool.query(sqlQuery, function (err, rows, fields) {
        if(err) {
            next(err);
            return;
        }
        var allSales = [];
        for(var i in rows){
            allSales.push({"id": rows[i].saleID, "eID": rows[i].eID, "cID": rows[i].cID, "tDate": rows[i].transactionDate, "tPurch": rows[i].totalPurchase});
        }
        mysql.pool.query(sqlQuery2, function (err, rows2, fields) {
            if(err) {
                next(err);
                return;
            }
            var sal_prod = [];
            for(var i2 in rows2){
                sal_prod.push({"sid": rows2[i2].sID, "pid": rows2[i2].pID, "qty": rows2[i2].number});
            }
            context.sal = allSales;
            context.sal_prod = sal_prod;
            //console.log(JSON.stringify(context));
            res.render('sales', context);
        });
    });
});
// insert new sale
//app.post('/manager', (req, res, next) => {
//    
//});


//-- PRODUCTS ~~
// select products
app.get('/products', (req, res, next) => {
    var context = { title: 'products' ,path:"products", };
    var sqlQuery = "SELECT * FROM products ORDER BY productID DESC";
    var sqlQuery2 = "SELECT * FROM sales_products ORDER BY sID DESC";
    mysql.pool.query(sqlQuery, function (err, rows, fields) {
        if(err) {
            next(err);
            return;
        }
        var allProds = [];
        for(var i in rows){
            allProds.push({"id": rows[i].productID, "pName": rows[i].name, "price": rows[i].price});
        }
        mysql.pool.query(sqlQuery2, function (err, rows2, fields) {
            if(err) {
                next(err);
                return;
            }
            var sal_prod = [];
            for(var i2 in rows2){
                sal_prod.push({"sid": rows2[i2].sID, "pid": rows2[i2].pID, "qty": rows2[i2].number});
            }
            context.prod = allProds;
            context.sal_prod = sal_prod;
            //console.log(JSON.stringify(context));
            res.render('products', context);
        });
    });
});
// insert new product
//app.post('/manager', (req, res, next) => {
// 
//});

app.get('/manager', (req, res, next) => {
    
    res.render('manager', { title: 'manager' ,path:"manager",});
 
});
app.get('/changes', (req, res, next) => {
    res.render('changes', { title: 'changes' ,path:"changes",});
});

function myOutput() {
    alert("customer!");
}
//boiler plate error and port handling
app.use(function(req, res){
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.type('plain/text');
	res.status(500);
	res.render("500");
});

app.listen(app.get('port'), function(){
    console.log('Express started on port:' + app.get('port') + '; press Ctrl-C to terminate.');
});
