
// Express
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());


// Routes
// questions
// Connect to db
const {db} = require("./db.js");

app.use(cors({ origin: true }));

// GET
app.get("/api/questions/:collection", async (req, res)=>{
  const collectionRef = db.collection(req.params.collection);

  collectionRef.get().then((result)=>{
    const randomIndex = Math.floor(Math.random() * (result["_size"]))+1;
    const docRef = db.collection(req.params.collection).doc(""+randomIndex);

    docRef.get().then((result)=>{
      res.send(result.data());
    });
  });
});


// POST
app.post("/api/questions/:collection", async (req, res)=>{
  const collectionRef = db.collection(req.params.collection);
  collectionRef.get().then(async (result)=>{
    db.collection(req.params.collection).doc(""+(result["_size"]+1)).set({
      pytanie: req.body.pytanie,
      odpowiedzi: {
        odpA: req.body.odpowiedzi.odpA,
        odpB: req.body.odpowiedzi.odpB,
        odpC: req.body.odpowiedzi.odpC,
        odpD: req.body.odpowiedzi.odpD},
      prawidlowaOdpowiedz: req.body.prawidlowaOdpowiedz,
      obrazek: req.body.obrazek}).then(() => {
      res.send("Document successfully written!");
    }).catch((error) => {
      res.send("Error writing document: ", error);
    });
  });
});


app.post("/api/questions/check/:collection", async (req, res)=>{
  const collectionRef = db.collection(req.params.collection);

  collectionRef.where("pytanie","==",req.body.pytanie).get().then((result)=>{
    res.send(result["size"]>0);
  });
});


/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.app = onRequest(app);
