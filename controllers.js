module.exports = function(app, conn) {

    //user controller
    var userController = require('./views/user/userController.js');
    userController(app, conn);

    // task info
    app.get('/task/info/:id', function(req, res) {
        conn.query('select * from tasks where id = ' + req.params.id, function(err, rows) {
            if(err) console.log(err);
            conn.query('select username from users where id = ' + rows[0].creator, function(err, users) {
                if(err) console.log(err);
                res.render('./task/info.html', {
                    'task' : rows[0],
                    'creator' : users[0].username
                });
            })
        });
    });

    // display the home page
    app.get('/', function(req, res) {
        conn.query('select * from tasks', function(err, rows, fields) {
            if(err) console.log(err);
            res.render('index.html', {'model' : rows, 'fields' : fields});
        });
    });

};