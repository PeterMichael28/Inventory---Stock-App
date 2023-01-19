const asyncHandler = require( 'express-async-handler' )
const bcrypt = require('bcryptjs')

const User = require( '../models/User')


const registerUser = asyncHandler( async ( req, res ) => {
    
    const { name, email, password } = req.body;
    console.log(name, email, password)
    
    //validation
    if ( !name || !email || !password ) {
        res.status( 400 )
        throw new Error ("Please fill in all required fields")
    };
    //validating the password strength
    if ( password.length < 6 ) {
        res.status( 400 )
        throw new Error ("Password must be up to 6 characters")
    };
    
    //checking if email already exists

    const user = await User.findOne( { email } ).exec()
    
    if ( user ) {
        res.status( 400 )
        throw new Error ("Email already exists")
    };


    //create a new user
    const result = await User.create({name, password, email})
    
    console.log( result )
    if ( result ) {
        const { _id, email, name, bio, photo, phone} = result
        
        res.status(201).json({_id, email, name, bio, photo, phone}) //201

    } else {
        res.status( 400 )
        throw new Error ("Error creating user profile")
    }
    


    
} )

const loginUser = asyncHandler( async ( req, res ) => {
    const { email, password } = req.body

    //checking if there is email and password
    if ( !email || !password ) {
        res.status( 400 ).json({message: "email and password are required"})
    }

    //checking if user exists
    const user = await User.findOne( { email } ).exec()
    
    
    if ( !user ) {
        res.status( 400 ).json( { message: "user does not exists" })
    }

     //checking the pwd
     const matchPwd = await bcrypt.compare( password, user.password )

})

module.exports = {
    registerUser,
    loginUser
}