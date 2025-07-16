// import express
const express = require('express');

// init app
const app = express();

// import cors
const cors = require('cors');

// import body parser
const bodyParser = require('body-parser');

// import dotenv untuk akses .env
const dotenv = require('dotenv');
dotenv.config();

// import routes
const authRoutes = require('./routes/auth.routes');

// use cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serve static uploads (jika pakai multer lokal)
app.use('/uploads', express.static('uploads'));

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// auth routes
const routes = require('./routes');
app.use('/api', routes);


// define port
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
