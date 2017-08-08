var express= require("express")
var randomID = require("random-id")

 function ID (req, res, next){
     req.body.id = randomID(10,'0')  
    next()
}

module.exports.ID = ID
