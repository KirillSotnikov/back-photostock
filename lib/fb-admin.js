const admin = require("firebase-admin");

const keys = require('../keys')
const serviceAccount = require(keys.fireBasePrivateKeyPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: keys.firebaseStorageBucketURL
});

const bucket = admin.storage().bucket();

module.exports = (req, res, next) => {
  req.bucket = req.bucket || bucket

  next();
}
