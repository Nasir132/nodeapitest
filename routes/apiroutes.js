const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const apiModel = require('../models/apimodel')


//get all users
router.get('/users',auttoken, async (req,res) => {
    jwt.verify(req.token, 'sshhhhhh')
    const getAllUsers = await apiModel.find();
    res.json(getAllUsers);
})

//get specific user by id
router.get('/users/:userid', async (req,res) => {
    const getSpecificUser = await apiModel.findById(req.params.userid);
    res.json(getSpecificUser)
})

//create a new user
router.post('/users', auttoken, (req,res) => {
    jwt.verify(req.token,'sshhhhhh', (err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
           
            const postusers = new apiModel({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                age: req.body.age,
        
            })
            postusers.save()
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.json({
                    message:err
                })
            })
        }
    })
    
})

//delete a user
router.delete('/users/:userid', async(req,res) => {
    const removeUser = await apiModel.remove({
        _id:req.params.userid
    })
    res.json("User deleted")
})

//update a user by id
router.patch('/users/:userid', async(req,res) => {
    const updateUser = await apiModel.updateOne({
        _id:req.params.userid
    },
    {$set: {
        name:req.body.name
    }}
    )
    res.json(updateUser)
})

//sign up for api token
//code for generating token
router.post('/users/login', (req,res) => {
    //mock users
    const users = {
        id:1,
        username:"nana",
        pass:"hey"
    }//accept user information and generate token
    jwt.sign({users},'sshhhhhh', {expiresIn:'2d'},(err,token)=>{
        res.json({
            token
        })
    })
})

//token format
//authorisation: Bearer <access_token>

//authenticate token
function auttoken(req,res,next){
    //get auth header value
    const bearerHeader = req.headers[
        "authorization"
    ];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next middleware
        next()
    }else{
        //forbidden access
        res.sendStatus(403)
    }
}

module.exports = router;