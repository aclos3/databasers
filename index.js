//  Author:  Andrew Clos
//  Date:  12/6/2019
//  Title: Assignment 6: Database and UI
//  Description: This project demonstrates some simple backend database and UI interactions by tracking workouts.

const express = require('express');               
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var Handlebars = require('handlebars');
const app = express();
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser'); 
var port = 3143;

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


//populate / display the table.
app.get('/', function(req, res, next){
    res.render('index', { title: 'index' ,path:"",});          
});

app.get('/customers', function(req, res, next){
    var context = {/* title: 'customers' ,path:"customers", */};
    var sqlQuery = 'SELECT customerID, email, memberSince, firstName, lastName FROM customers';
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
    });
        res.render('customers', context);
});

app.get('/employees', (req, res, next) => {
    res.render('employees', { title: 'employees' ,path:"employees",});
});
app.get('/sales', (req, res, next) => {
    res.render('sales', { title: 'sales' ,path:"sales",});
});
app.get('/products', (req, res, next) => {
    res.render('products', { title: 'products' ,path:"products",});
});

app.get('/manager', (req, res, next) => {
    res.render('manager', { title: 'manager' ,path:"manager",});
});
app.get('/changes', (req, res, next) => {
    res.render('changes', { title: 'changes' ,path:"changes",});
});

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