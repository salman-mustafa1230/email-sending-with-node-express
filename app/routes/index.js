module.exports = function(app) {
    const express = require('express');
    const path = require('path');
    const controllers = require('../controllers')(app);
    const router = express.Router(); // eslint-disable-line new-cap
    // passport.authenticate('bearer', {session: false}),
    router.use('/mail',  require('./email')(app, controllers));

    
    return router;
};