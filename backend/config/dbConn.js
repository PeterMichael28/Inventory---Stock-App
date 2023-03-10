//mongoose
const mongoose = require( 'mongoose' );


const connectDB = async () => {
    try {
        await mongoose.connect( process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log(error)
    }
};

module.exports = connectDB