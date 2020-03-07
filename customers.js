module.exports = function(){
    var express = require('express');
    var app = express.Router();

    app.get('/customers', function(req, res, next){
        res.render('customers', { title: 'customers', path:"customers",});
    });
}
