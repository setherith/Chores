module.exports = function(app, conn) {
    
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

};