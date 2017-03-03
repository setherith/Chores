// controllers for user views
module.exports = function(app, conn) {

    var login_fails = 0;
    var has_failed = false;

    // display login form
    app.get('/user/login', function(req, res) {
        res.render('./user/login.html', 
        {
            'attempts' : login_fails,
            'unlocked' : login_fails < 3,
            'failed' : has_failed
        });
    });

    // process login request
    app.post('/user/login', function(req, res) {
        conn.query('select validate_user(\'' 
                    + req.body.username + '\', \'' 
                    + req.body.password + '\');', function(err, rows, fields) {
            if (err) console.log(err);
            if (rows[0][fields[0].name] == 0) {
                // ----- Not Valid -----
                login_fails++;
                has_failed = true;
                res.redirect('/user/login');
            } else if(rows[0][fields[0].name] == 1) {
                // ----- Valid -----
                conn.query('select * from tasks', function(err, rows, fields) {
                    if(err) console.log(err);
                    req.session.user = req.body.username;
                    res.render('index.html', {
                        'model' : rows, 
                        'fields' : fields
                    });
                });
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