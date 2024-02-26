

// Express
const express = require('express')
const app = express()
app.use(express.json())




// Routes
// questions
    const questions = require('./routes/questions')
    app.use('/api/questions', questions)


// Aktywacja serwera
const port = process.env.PORT || 3000
app.listen(port, ()=>{console.log(`Listening on port ${port}...`)})






const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.app = onRequest(app)