'use strict';

var mongoose = require('mongoose');
const config = require("config");

console.log("enVVVV", config.db.dbURI);
var dbURI = config.db.dbURI;

var options = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
    
}
console.log('URI', dbURI);
var db = mongoose.connection;
db.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });

  db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  db.on('connected', function() {
    console.log('MongoDB connected!');
  });
  db.once('open', () => {
    console.log('MongoDB connection opened!');
  });
  db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    // mongoose.connect(dbURI, {server:{auto_reconnect:true}});
  });

mongoose.connect(dbURI, options);

// db.on('error', console.error.bind(console, "connection failed"));
// db.once('open', function () {
//     console.log("Database conencted successfully!");
// });
mongoose.set('debug', true);

var normalizedPath = require("path").join(__dirname, "../schema");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    require("../schema/" + file);
});



process.on('SIGINT', function(){
  mongoose.connection.close(function(){
     console.log("Mongoose default connection is disconnected due to application termination");
     process.exit(0);
  });
});

