module.exports = function(app, conn) {

    //user controller
    var userController = require('./views/user/userController.js');
    userController(app, conn);

    //task controller
    var taskController = require('./views/task/taskController.js');
    taskController(app, conn);

    // admin: users
    app.get('/admin/users', function(req, res) {
        if (req.session.admin) {
            conn.query('select * from users', function(err, rows) {
                res.render('./admin/users.html', {'users' : rows});
            });
        } else {
            res.redirect('/');
        }
    });

    // admin: users
    app.post('/admin/users/:id', function(req, res) {
        console.log(req.body.action + " " + req.params.id);
        res.redirect('/admin/users');
    });

    // display the home page
    app.get('/', function(req, res) {
        conn.query('select t.*, u.username creator from tasks t, users u where t.creator = u.id;', function(err, rows) {
            if(err) console.log(err);
            res.render('index.html', 
            {
                'model' : rows, 
                'username' : req.session.user, 
                'admin' : req.session.admin == 1
            });
        });
    });

};
