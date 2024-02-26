
// Express
    const express = require('express')
    const app = express.Router()

    
// Connect to db
    const {db} = require('../db.js')


// GET
    app.get('/:collection', async (req,res)=>{
        const collectionRef = db.collection(req.params.collection)

        collectionRef.get().then((result)=>{

            const randomIndex = Math.floor(Math.random() * (result["_size"]+1))
            const docRef = db.collection(req.params.collection).doc(""+randomIndex)

            docRef.get().then((result)=>{
                res.send(result.data())
            })
        })
    })



// POST
    app.post('/:collection', async (req,res)=>{
        const collectionRef = db.collection(req.params.collection);
        collectionRef.get().then(async(result)=>{
            db.collection(req.params.collection).doc(""+(result["_size"]+1)).set({
                pytanie: req.body.pytanie,
                odpowiedzi: {
                    odpA: req.body.odpowiedzi.odpA,
                    odpB: req.body.odpowiedzi.odpB,
                    odpC: req.body.odpowiedzi.odpC,
                    odpD: req.body.odpowiedzi.odpD
                },
                prawidlowaOdpowiedz: req.body.prawidlowaOdpowiedz,
                obrazek: req.body.obrazek,
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