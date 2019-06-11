const ObjectId = require('mongodb').ObjectID;

// Get all syntheses of a given debate
exports.alldebate = (db, debate, cb) => {
  const debateId = debate;
  db.get('synthesecollection').find({
    debate: ObjectId(debateId),
  }, {}, (err, docs) => {
    return err ?
      cb(err)
      : cb(null, docs);
  });
};


// Get all syntheses 
exports.all = (db, cb) => {
  db.get('synthesecollection').find({}, {}, (err, docs) => {
    if (err) return cb(err);
    return cb(null, docs);
  });
};




// Get one synthese
exports.one = (db, id, cb) => {
  db.get('synthesecollection').findOne({
    _id: id,
  }, {}, (err, doc) => {
    return err ?
      cb(err)
      : cb(null, doc);
  });
};

// Create a new synthese
exports.new = (db, obj, cb) => {
  db.get('synthesecollection').insert({
    description: obj.description,
    contributions: obj.contributions,
    debate: obj.debate,
    auteur: obj.auteur,
    timestamp: obj.timestamp,
  }, {}, (err, doc) => {
    return err ?
      cb(err)
      : cb(null, doc);
  });
};

// Delete a synthese
exports.delete = (db, id, cb) => {
  db.get('synthesecollection').remove({
    _id: id,
  }, {}, (err) => {
    return err ?
      cb(err)
      : cb(null);
  });
};
