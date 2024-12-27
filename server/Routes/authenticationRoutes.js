const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const jobbyUsersData = require("../Models/jobbyUsers")
const jwtAuthentication = require('../Middleware/jwtAuthentication')

router.get("/", (request, response) => {
    response.send("Authentication Routes")
});

//User Signup API
router.post("/signup", async (request, response) => {
    try {
        const { name, email, phoneNumber, gender, password, designation } = request.body

        const isEmailExist = await jobbyUsersData.findOne({ email: email })
        if (!isEmailExist) {

            const hashedPassword = await bcrypt.hash(password, 10)

            //create an user
            const newUser = new jobbyUsersData({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                gender: gender,
                password: hashedPassword,
                designation: designation
            })
            newUser.save()
            return response.status(200).json({message: "Registration Successfully!"})
        }
        else {
            //email already exist
            return response.status(400).json({message: "Email Already Exists!"})
        }
    }
    catch(error){
        console.log(error.message, "signup")
        return response.status(500).json({message: "Internal Server Error at Signup"})
    }
});

//User Login API
router.post("/login", async (request, response)=> {
    try{
        
        const {email, password} = request.body
        const isEmailFound = await jobbyUsersData.findOne({email: email})

        if(isEmailFound){
            //compare passwords
            const isPasswordValid = await bcrypt.compare(password, isEmailFound.password)
            
            //login success
            if(isPasswordValid){

                let payload = {
                    userId: isEmailFound._id
                }
                let token = jwt.sign(payload, 'GIRI_SECRETE_KEY', {expiresIn: '10m'})

                return response.status(200).json({token: token, message: "Login Successfully!"})
            }
            else{
                return response.status(400).json({message: "Enter Valid Password"})
            }
            
        }
        else{
            return response.status(400).json({message: "Email Not Found"})
        }
    }
    catch(error){
        console.log(error.message, "Login Api")
        return response.status(500).json({message: "Internal Server Error at Login"})
    }
});

router.get("/profile", jwtAuthentication, async (request, response)=> {
    // const {userId} = request.params

    try{
        const userDetails = await jobbyUsersData.findOne({_id: request.id})
        return response.status(200).json({profile: userDetails})
    }
    catch(error){
        console.log(error, "Profile API")
        return response.status(500).json({message: "Internal Server Error at Profile"})
    }
});

module.exports = router;