

const admin = require('firebase-admin')
const serviceAccount = require('./google-cloud-key/inf00-7db24-firebase-adminsdk-npfc3-d3463a180f.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://inf00-7db24-default-rtdb.europe-west1.firebasedatabase.app"
  });
const db = admin.firestore()

module.exports = {db}