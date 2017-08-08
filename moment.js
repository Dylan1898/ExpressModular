var express= require("express")
var moment = require('moment');

 function Time (req, res, next){
    req.body.time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
next()
}
module.exports.Time = Time