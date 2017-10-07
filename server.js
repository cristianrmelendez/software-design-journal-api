var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var posts = require('./routes/posts');
var users = require('./routes/users');



var app = express();
// Parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
var mongodbUri = 'mongodb://user:inso4116@ds121464.mlab.com:21464/inso4116-journal';

mongoose.Promise = global.Promise;

mongoose.connect(mongodbUri , {
    useMongoClient: true,
      }
    );
  
  // Save database object from the callback for reuse.
  
  console.log("Database connection ready");


  app.use('/api', posts);
  app.use('/api', users);

  // Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

