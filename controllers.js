module.exports = function(app, conn) {

    //user controller
    var userController = require('./views/user/userController.js');
    userController(app, conn);

    //task controller
    var taskController = require('./views/task/taskController.js');
    taskController(app, conn);

    app.get('/test', function(req, res) {
        res.render('test.html', {'message' : "this is test data"});
    });

    // display the home page
    app.get('/', function(req, res) {
        conn.query('select * from tasks', function(err, rows, fields) {
            if(err) console.log(err);
            res.render('index.html', {'model' : rows, 'fields' : fields});
        });
    });

};
