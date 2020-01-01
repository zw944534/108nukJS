var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../nukjsfinal-firebase-adminsdk-fn2w3-142e7ebe10.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nukjsfinal.firebaseio.com"
});

let db = admin.firestore();


/* GET home page. */
router.get('/', function(req, res, next) {
	var roomRef = db.collection('room');
	
	// console.log(serviceRef);
	var roomData = [];
	var serviceData=[]; 	
	  	roomRef.get().then(function (querySnapshot) { 
	    	querySnapshot.forEach(function (doc) {
	    		console.log(doc.id);
	    		let serviceRef = roomRef.doc(doc.id).collection("service");
	    		serviceRef.get().then(function(querySnapshot){
	    			querySnapshot.forEach(function(docS){
	    				
	    				serviceData.push(docS.data());
	    				
	    			});
	    			// console.log(serviceData);
	    		});

	      		roomData.push(doc.data());
	    	});
	    	
	    	console.log(roomData);
	    	res.render('index', { data : roomData });
  		});
  		
});



router.post('/detail',function(req,res){
	var roomRef = db.collection('room');
	
	// console.log(serviceRef);
	var roomData = [];
	var serviceData=[]; 	
	  	roomRef.where('name','==',req.body.name).get().then(function (querySnapshot) { 
	    	querySnapshot.forEach(function (doc) {
	    		console.log(doc.id);
	    		let serviceRef = roomRef.doc(doc.id).collection("service");
	    		serviceRef.get().then(function(querySnapshot){
	    			querySnapshot.forEach(function(docS){
	    				
	    				serviceData.push(docS.data());
	    				
	    			});
	    			console.log(serviceData);
	    			roomData.push(doc.data());
	    			console.log(roomData);
	    			res.render('detail', { rData : roomData , sData : serviceData });
	    		});

	      		
	    	});
	    	// console.log(serviceData);
	    	
	    	
  		});
	console.log(req.body.name);
});

module.exports = router;
