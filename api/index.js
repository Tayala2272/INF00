

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


