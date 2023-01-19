const dotenv = require( 'dotenv' ).config();
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const bodyParser = require('body-parser')
const cors = require( 'cors' );
const userRoutes = require('./routes/userRoutes')

const connectDB = require( './config/dbConn' )


connectDB()

const errorHandler = require('./middleware/errorHandler')

const app = express();



const PORT = process.env.PORT || 4000;

//middlewares
app.use( express.json() ); //to handle our jsons
app.use( express.urlencoded( { extended: false } )); //handle data via url
app.use( bodyParser.json() ); // to parse the data sent in the body from the frontend

//Routes middleware
app.use('/api/users', userRoutes)

//Routes
app.get( '/', ( req, res ) => {
    res.send("Homepage")
} )

//Error middleware
app.use(errorHandler);

//connecting to db and start server
mongoose.connection.once( 'open', () => {
    console.log( 'Connected to MongoDB' )
    app.listen( PORT, () => console.log('server up and running on port ' + PORT))
})