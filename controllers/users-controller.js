
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const User = require('../models/user');

const {validationResult} = require('express-validator');

const DUMMY_USERS = [
    {
        id:"u1",
        name:"Thilina ",
        email:"test@gmail.com",
        password:"123456789"
    }
]

const getUsers=(req, res, next)=>{
    res.json({users:DUMMY_USERS})
};



const signup= async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return next(new HttpError("Invalid inputs, please check your data", 422))
    }
    const {name, email, password, places} = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({email:email});
    } catch (err) {
        const error = new HttpError('Signup failed, please try again later', 500)
        return next(error);
    }

    if(existingUser){
        const error =  new HttpError("Could not create user, email already exist", 422);
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        image: "https://media-exp1.licdn.com/dms/image/C5603AQF3g4a3m3_dVw/profile-displayphoto-shrink_200_200/0/1651069085398?e=1675296000&v=beta&t=jNtCxSaRWnhc4vRs6HpACKnFkNNjUqe-eyjPD50qOd0",
        password,
        places
    })
   

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signin up failed, please try again later', 500)
        return next(error)
    }
    
    res.status(201).json({user:createdUser})
};

const login=(req, res,next) =>{
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u=> u.email ===email)
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError("Could not identify user, credentials seem to be wrong", 401);
    }
    res.json({message:"Logged in!"});
}

exports.getUsers= getUsers;
exports.signup= signup;
exports.login=login; 
