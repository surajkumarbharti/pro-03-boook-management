const { title } = require("process")
const userModel = require("../models/userModel")

const isValid = function(value){
    if(typeof value ==='undefined' || value ===null){
        return false
    }
    if(typeof value ==='string'&& value.trim().length==0){
        return false
    }
    return true
}

const createUser = async function(req, res){
try{
    let data = req.body
    let{title, name, phone, email, password}=data
    if(!isValid(title))
    return res.status(400).send({status:false, msg:"title is not exist"})

    if(!isValid(name))
    return res.status(400).send({status:false,msg:'Name is not exit'})

    if(!isValid(phone))
    return res.status(400).send({status:false,msg:"Phone is not exist"})

    if(!isValid(email))
    return res.status(400).send({status:false,msg:"Email is not exist"})

    if(!isValid(password))
    return res.status(400).send({status:false,msg:"Password is wrong"})

    let createUser =await userModel.created(data)
    res.status(201).send({data:createUser})

}
catch(err){
    res.status(500).send({msg:"error", error:err.message})
}
}
module.exports.createUser = createUser
