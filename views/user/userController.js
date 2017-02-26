// controllers for user views
module.exports = function(app, conn) {

    // display login form
    app.get('/user/login', function(req, res) {
        res.render('./user/login.html');
    });

    // process login request
    app.post('/user/login', function(req, res) {
        conn.query('select validate_user(\'' 
                    + req.body.username + '\', \'' 
                    + req.body.password + '\');', function(err, rows, fields) {
            if (err) console.log(err);
            if (rows[0][fields[0].name] == 0) {
                // Not Valid
                console.log('Failed login');
            } else if(rows[0][fields[0].name] == 1) {
                // Valid
                console.log('User [' + req.body.username + '] logged on.');
                res.render('./user/info.html');
            }
        });
    });

    app.get('/user/add', function(req, res) {
        res.render('./user/add.html');
    });

    app.post('/user/add', function(req, res) {
        //Validation
        var valid = false;

        if(req.body.password != req.body.confirmpw) {
            res.render('./user/add.html', { 
                'err': 'Passwords don\'t match',
                'username' : req.body.username,
                'email' : req.body.email
            });
            valid = false;
        }
            
        if(valid)
            res.render('./user/info.html');
    });

    app.post('/update', function(req, res) {
        console.log(req.body);
        res.redirect('/');
    });

};