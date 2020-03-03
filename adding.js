app.post('/customers', (req, res) => {
    var parameters = [req.body.email, req.body.member_since, req.body.fname, req.body.lname];
    var queryResults = "INSERT INTO customers (email, memberSince, firstName, lastName) VALUES (?,?,?,?)";
    mysql.pool.query(queryResults, parameters, function(err, rows, fields) {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/customers');
    });
});

app.post('/employees', (req, res) => {
    var parameters = [req.body.title, req.body.start_time, req.body.stop_time, req.body.hourly_rate,
                      req.body.part_time, req.body.fname, req.body.lname];
    var queryResults = "INSERT INTO employees (title, startTime, stopTime, hourlyRate, partTime, firstName, lastName) VALUES (?,?,?,?,?,?,?)";
    mysql.pool.query(queryResults, parameters, function(err, rows, fields) {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/employees');
    });
});

app.post('/products', (req, res) => {
    var parameters = [req.body.product_name, req.body.product_price];
    var queryResults = "INSERT INTO products (name, price) VALUES (?,?)";
    mysql.pool.query(queryResults, parameters, function(err, rows, fields) {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/products');
    });
});

app.post('/sales', (req, res) => {
    var parameters = [req.body.transaction_date, req.body.total_purchase];
    var queryResults = "INSERT INTO sales_products (transactionDate, totalPurchase) VALUES (?,?)";
    mysql.pool.query(queryResults, parameters, function(err, rows, fields) {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/sales');
    });
});

app.post('/sales_products', (req, res) => {
    var parameters = [req.body.number_purchased];
    var queryResults = "INSERT INTO sales_products (number) VALUES (?)";
    mysql.pool.query(queryResults, parameters, function(err, rows, fields) {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/sales_products');
    });
});
