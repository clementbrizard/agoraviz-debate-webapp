var express = require('express');
var router = express.Router();

/* GET debatslist. */
router.get('/debatslist', function(req, res) {
  var db = req.db;
  var collection = db.get('debatcollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });

});

/* GET debatid. */
router.get('/debatslist/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('debatcollection');

  var debatToFocusOn = req.params.id;
  collection.find({ '_id' : debatToFocusOn }, function(e,docs){
    res.json(docs);
  });

});




/* DELETE to deletedebat. */
router.delete('/deletedebat/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('debatcollection');
  var debatToDelete = req.params.id;
  collection.remove({ '_id' : debatToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;


/* POST to Add Contrib Service */
router.post('/:id/addcontrib', function(req, res) {
console.log(req);
    // Set our internal DB variable
    var db = req.db;
    console.log(req);
    // Get our form values. These rely on the "name" 

     
     var contribQuestionId = req.params.id;
    
    var contribParent = null;
    var contribType = req.body.contribType;
    var contribTexteCourt = req.body.tcourt;
    var contribTexteLong = req.body.tlong;
    var contribAuteur = req.body.auteur;

    var dateNewContrib = new Date();
    var jour = dateNewContrib.getDate();
    var mois = dateNewContrib.getMonth()+1;
    var annee = dateNewContrib.getFullYear();
    var heure = dateNewContrib.getHours();
    var minute = dateNewContrib.getMinutes();
    var seconde = dateNewContrib.getSeconds();

    var contribDateHeure =jour+'/'+mois+'/'+annee+':'+heure+'H'+minute+'min'+seconde+'s';

    // Set our collection
    var collection = db.get('contribcollection');

    // Submit to the DB
    collection.insert({
    	"questionParent" : contribQuestionId,
    	"contribParent" : contribParent,
        "type" : contribType,
        "tcourt" : contribTexteCourt,
        "tlong" : contribTexteLong,
        "auteur" : contribAuteur,
        "timestamp" : contribDateHeure
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("debatslist");
        }
    });



});


router.get('/debatslist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('debatcollection');
    collection.find({},{},function(e,docs){
        res.render('pages/debatslist', {
            "debatslist" : docs,
            title: 'AgoraViz'
        });
    });
    res.redirect("debat");
});


