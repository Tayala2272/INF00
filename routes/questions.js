
// Express
    const express = require('express')
    const app = express.Router()

// Connect to db
    const admin = require('firebase-admin')
    const serviceAccount = require('../google-cloud-key/inf00-7db24-bba113f533c6.json')

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    const db = admin.firestore()


// GET
    app.get('/:collection', async (req,res)=>{
        const collectionRef = db.collection(req.params.collection)

        collectionRef.get().then((result)=>{

            const randomIndex = Math.floor(Math.random() * (result["_size"]+1))
            const docRef = db.collection(req.params.collection).doc(""+randomIndex)

            docRef.get().then((result)=>{
                res.send(result)
            })
        })
    })



// POST
    app.post('/:collection', async (req,res)=>{
        const collectionRef = db.collection(req.params.collection);
        collectionRef.get().then(async(result)=>{
            db.collection(req.params.collection).doc(""+(result["_size"]+1)).set({
                name: "Los Angeles",
                state: "CA",
                country: "USA"
            })
            .then(() => {
                res.send("Document successfully written!")
            })
            .catch((error) => {
                res.send("Error writing document: ", error)
            });
        })
    })


module.exports = app