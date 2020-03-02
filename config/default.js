'use strict';

module.exports = {

    isSetupServer: '0',

    port: 5000,

    db: {
        dbURI: 'mongodb+srv://<User>:<password>@URL/test?retryWrites=true&w=majority'
    },

	email: {
		admin: 'salman.mustafa1230@gmail.com',
		user: 'ctest@gmail.com',
		username: 'salman',
		pass: 'faf==',
		host: 'smtp.gmail.com',
		port: 587,
		ssl: false,
		relay:false,
		relay_host:''	
	},
    baseurl: 'http://localhost:5000/'
};