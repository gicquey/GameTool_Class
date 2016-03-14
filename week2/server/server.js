/**
 * Created by Ninja on 14/03/2016.
 */

// SETUP
var express     = require('express');
var bodyParser  = require('body-parser');

// Define our app using express
var app        = express();

// Allow cross origin
app.use(function(req, res, next)
        {
	        res.header("Access-Control-Allow-Origin", "*");
	        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	        // Request methods you wish to allow
	        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	        next();
        });

// Configure app to use bodyParser() (let us get the data from a POST)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting Port
var port = process.env.PORT || 8181;

// Create our Express Router
var router = express.Router();

// Debug
router.use(
	function(req, res, next)
	{
		console.log('Request URL:', req.originalUrl);
		next();
	},
	function (req, res, next)
	{
		console.log('Request Type:', req.method);
		next();
	});

// FIRST ROUTE, in order to verify the api
router.get('/',
           function(req, res)
           {
	           res.json({ message: 'Welcome to Game Server API.' });
           });

// Use Router
app.use('/api', router);

// ========== Routes ==========

// === General Route ===

var GameController = require('./controllers/game');

router.route('/game/update')
      .get(GameController.getUpdate);

// === Player Routes ===
var PlayerController = require('./controllers/player');

router.route('/game/player/answers/:number')
      .get(PlayerController.compareAnswer);

// === Admin Routes ===
var  AdminController = require('./controllers/admin');

router.route('/game/admin/answers')
      .get(AdminController.getAnswers)
      .put(AdminController.randomize);

router.route('/game/admin/answers/current')
      .get(AdminController.getCurrentAnswer);

router.route('/game/admin/answers/:number')
      .post(AdminController.addAnswer);

//
// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Game Server listening on ' + port);

// Debug
console.log('Current Answer: ' + GameController.currentAnswer);
console.log('Current Instance ID: ' + GameController.instanceID);