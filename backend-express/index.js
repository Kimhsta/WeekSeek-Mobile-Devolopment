//import express
const express = require('express')

//init app
const app = express()

//import cors
const cors = require('cors')

//import body parser
const bodyParser = require('body-parser')

//use cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})