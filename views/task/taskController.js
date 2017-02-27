module.exports = function(app, conn) {
    
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

    // task add (default)
    app.get('/task/add', function(req, res) {
        res.render('./task/add.html');
    });

    // task insert
    app.post('/task/add', function(req, res) {
        conn.query('call add_task(\'' + req.body.name + '\', ' + 1 + ')', function(err, rows) {
            if(err) console.log(err);
            res.redirect('/');
        });
    })

    // task remove
    app.post('/task/remove/:id', function(req, res) {
        conn.query('call delete_task(' + req.params.id + ')', function(err, rows) {
            if(err) console.log(err);
            res.redirect('/');
        });
    });

};