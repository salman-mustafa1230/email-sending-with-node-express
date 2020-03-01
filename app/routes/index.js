module.exports = function(app) {
    const express = require('express');
    const path = require('path');
    const controllers = require('../controllers')(app);
    // we can use jwt for authentication using passport
    const router = express.Router(); // eslint-disable-line new-cap
    // passport.authenticate('bearer', {session: false}),
    router.use('/mail',  require('./mail/email')(app, controllers));

    
    return router;
};