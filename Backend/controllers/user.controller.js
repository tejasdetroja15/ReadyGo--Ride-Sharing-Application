const userModel = require("../models/user.model.js");
const userService = require('../services/user.service.js')
const {validationResult} = require('express-validator');
const blacklistTokenModel = require("../models/blacklist.model.js");

module.exports.registerUser = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashpassword = await userModel.hashpassword(password);

    const user =await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,      
        password: hashpassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({token, user});
}

module.exports.loginUser = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password no email'});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token',token);
    return res.status(200).json({token, user});

}

module.exports.getProfile = async (req,res,next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
    }
}

module.exports.logoutUser = async (req,res,next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});
    res.status(200).json({message: 'Logged out successfully'});
}

