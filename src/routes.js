module.exports = (app)  =>  {
    //app.use('/user', require('./user/routes'));
    app.use('/external', require('./external/routes'));
    //app.use('/internal', require('./internal/routes'));
    
    app.get('/', (req, res, next)   =>  {
        res.send('ALIVE');
    });
};