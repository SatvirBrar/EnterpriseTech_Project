var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* Creating database */
MongoClient.connect(url, function(err, db) {
if (err) throw err;
console.log("Database created!");
db.close();
});

/* Creating collections*/

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("billing", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("feedback", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("TaxiCompany");
dbo.createCollection("taxi_price_range", function(err, res) {
if (err) throw err;
console.log("Collection created!");
db.close();
});
});

/* Inserting documents into collections */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myobj = [
   	{  customer_id:'110',car_id: '101',amount:'45',date:'sept 20, 2019'},
	{ customer_id:'471',car_id: '721',amount:'100',date:'nov 10, 2019'},
	{ customer_id:'117',car_id: '517',amount:'65.11',date:'nov 19, 2019'},
	{ customer_id:'380',car_id: '109',amount:'50',date:'nov 30, 2019'},
	{ customer_id:'511',car_id: '305',amount:'70.25',date:'dec 02, 2019'}
	

  ];
  dbo.collection("billing").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myobj = [
   	{ customer_id:'110',car_id: '101',driver_id: '3409',feedback:'good'},
	{ customer_id:'471',car_id: '721',driver_id: '8025',feedback:'execlent'},
	{ customer_id:'117',car_id: '517',driver_id: '5770',feedback:'very good'},
	{ customer_id:'117',car_id: '109',driver_id: '5770',feedback:'good'},
	{ customer_id:'511',car_id: '305',driver_id: '3765',feedback:'poor'}
	

  ];
  dbo.collection("feedback").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myobj = [
   	{ car_id: '101',capacity:'4',modelNo:'c2015',price:'50'},
	{ car_id: '721',capacity:'8',modelNo:'a2019',price:'80'},
	{ car_id: '517',capacity:'5',modelNo:'honda2017',price:'100'},
	{ car_id: '109',capacity:'7',modelNo:'p2018',price:'66'},
	{ car_id: '305',capacity:'3',modelNo:'j2016',price:'45'}
	

  ];
  dbo.collection("taxi_price_range").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});


/* Reading Collections after Inserting documents */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("billing").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("feedback").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  dbo.collection("taxi_price_range").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
 
 /*Updating Collections */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = {car_id: "109"};
  var newvalues = {$set: {amount:"59.55"} };
  dbo.collection("billing").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = {driver_id: "3409"};
  var newvalues = {$set: {feedback:"Five Star,Enjoyable ride!!"} };
  dbo.collection("feedback").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = {car_id:"721"};
  var newvalues = {$set: {price:"120"} };
  dbo.collection("taxi_price_range").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});

/* Deleting Collections */
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TaxiCompany");
  var myquery = ({$and :[{customer_id: "380"},{car_id:"109"}]});
  dbo.collection("billing").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});