//  Author:  Andrew Clos
//  Date:  12/6/2019
//  Title: Assignment 6: Database and UI
//  Description: This project demonstrates some simple backend database and UI interactions by tracking workouts.

var express = require("express");               
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var app = express();
var mysql = require("./dbcon.js");
var bodyParser = require("body-parser"); 
var port = 3143;

//set port to my default for the quarter (last four of student ID)
app.set("port", port);                          
app.engine("handlebars", handlebars.engine);     
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

//from assignment instructions, this will reset the table
app.get('/reset-table',function(req,res,next){    
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "unit VARCHAR(255) NOT NULL)";  //changed to a varchar to hold a string of 'lbs' or 'kgs'
        mysql.pool.query(createString, function(err){
            res.render('exercise',context);
        })
    });
});

//populate / display the table.
app.get('/', function(req, res, next){
    
    var context = {};
    mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields) 
    {           
        if(err){                                                               
            next(err);
            return;
    }

    //load an array with all of the parameters using a for loop to work through each row in the table.
    var elements = [];   
    for(var i in rows)
    {
        elements.push({'id':rows[i].id, 'name': rows[i].name, 'reps': rows[i].reps, 'weight': rows[i].weight, 'date':rows[i].date, 'unit':rows[i].unit}) 
    }
    context.workouts = elements;
    res.render('exercise', context);           
    })
});

app.get('/insert',function(req,res,next){
  var context = {};
   mysql.pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `unit`) VALUES (?, ?, ?, ?, ?)", 
    [req.query.exerciseType, req.query.reps, req.query.weight, req.query.date, req.query.unit],
     function(err, result){  //boiler plate error handling
        if(err){
          next(err);
          return;
        }         
        context.workouts = result.insertId;
        res.send(JSON.stringify(context));
  });
});

//edit the data in the given row
app.get('/refreshExercise',function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT * FROM `workouts` WHERE id=?', [req.query.id], 
        function(err, rows, fields){
            if(err){
                next(err);
                return;
            }

            var elements = [];

            for(var i in rows)
            {                  
                elements.push({'id':rows[i].id, 'name': rows[i].name, 'reps': rows[i].reps, 'weight': rows[i].weight, 'date':rows[i].date, 'unit':rows[i].unit}) 
            }
            context.workouts = elements[0];                  
        res.render('refreshExercise', context);
    });
});

//perform the actual update to the database.
app.get('/update', function(req, res, next){
    
    var context = {};

    mysql.pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=?', [req.query.exerciseType, req.query.reps, req.query.weight, req.query.date, req.query.unit, req.query.id],
    function(err, result)
    {
        mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields)
        {
            if(err){
                next(err);
                return;
            }

            var elements = [];

            for(var i in rows)
            {                  
                elements.push({'id':rows[i].id, 'name': rows[i].name, 'reps': rows[i].reps, 'weight': rows[i].weight, 'date':rows[i].date, 'unit':rows[i].unit}) 
            }
            context.workouts = elements;
            res.render('exercise', context);  //take the user back "home"
        });
    });
});

//to delete a row from the database
app.get('/delete', function(req, res, next) {
    var context = {};    
    mysql.pool.query("DELETE FROM `workouts` WHERE id = ?", [req.query.id], 
        function(err, result) {
            if(err){
                next(err);
                return;
            }
    });
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