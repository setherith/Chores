module.exports = function(app, conn) {

    //user controller
    var userController = require('./views/user/userController.js');
    userController(app, conn);

    //task controller
    var taskController = require('./views/task/taskController.js');
    taskController(app, conn);

    var adminController = require('./views/admin/adminController.js');
    adminController(app, conn);
    
    // display the home page
    app.get('/', function(req, res) {
        conn.query('call default_view()', function(err, rows) {
            if(err) console.log(err);
            res.render('index.html', 
            {
                'model' : rows[0], 
                'username' : req.session.user, 
                'admin' : req.session.admin == 1
            });
        });
    });

};
