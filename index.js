const express = require('express')
const connectDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

const app = express()
const port = 3015

// connect to mongo database
connectDB()

app.use(cors())

// ensures that any incoming data understood by json
app.use(express.json()) 

app.use('/', router)

app.listen(port, () => {
    console.log('listing on port', port)
})