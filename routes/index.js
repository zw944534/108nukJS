var express = require('express');
var router = express.Router();


var admin = require("firebase-admin");

var serviceAccount = require("../testjs1125-firebase-adminsdk-yczu1-53b501ed91.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testjs1125.firebaseio.com"
});

let db = admin.firestore();

// console.log(db);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
