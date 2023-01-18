const dotenv = require( 'dotenv' ).config();
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const bodyParser = require('body-parser')
const cors = require( 'cors' );

const connectDB = require('./config/dbConn')

connectDB()

const app = express();

const PORT = process.env.PORT || 4000;

//connecting to db and start server
mongoose.connection.once( 'open', () => {
    console.log( 'Connected to MongoDB' )
    app.listen( PORT, () => console.log('server up and running on port ' + PORT))
})