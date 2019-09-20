const {Router} = require('express')
const ctr = require('../controllers/storage.controller')

const router = Router()


const admin = require("firebase-admin");

const keys = require('../keys')
// const cloudStorage = require('../middleware/cloudStorage')

// // const serviceAccount = require(keys.fireBasePrivateKeyPath);

// // // let FBadmin = admin.initializeApp({
// // //   credential: admin.credential.cert(serviceAccount),
// // //   storageBucket: keys.firebaseStorageBucketURL
// // // });

// // // const FBstorage = FBadmin.storage()

const bucket = admin.storage().bucket();

router.use(function(req, res, next) {
  if (!req.admin) {
    req.admin = admin;
  }
  if (!req.bucket) {
    req.bucket = bucket;
  }
  next();
});

//- /storage

router.get('/images/:name', ctr.getImageFile)

module.exports = router