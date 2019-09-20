const {Router} = require('express')
const ctr = require('../controllers/images.controller')
const upload = require('../middleware/upload')

const router = Router()



const admin = require("firebase-admin");

const keys = require('../keys')
const cloudStorage = require('../middleware/cloudStorage')

const serviceAccount = require(keys.fireBasePrivateKeyPath);

let FBadmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: keys.firebaseStorageBucketURL
});

const FBstorage = FBadmin.storage()

const bucket = admin.storage().bucket();

router.use(function(req, res, next) {
  if (!req.admin) {
    req.admin = admin;
  }
  if (!req.bucket) {
    req.bucket = bucket;
  }
  if (!req.FBstorage) {
    req.FBstorage = FBstorage;
  }
  next();
});

//- /api/images/

router.get('/', ctr.getAllImages)

router.post('/', upload.single('image'), cloudStorage.upload, ctr.addImage)

router.delete('/', ctr.removeImage)


module.exports = router