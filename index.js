var express = require("express");
var app = express();
var bp = require("body-parser")
var fs = require('fs');
var path = require('path')
// var randomID = require("random-id")
var api = require('./api')
var chirp= require('./chirps.ctrl')
var jsonPath = path.join(__dirname, 'data.json');
var url = require('url');
app.use(bp.json())
app.use('/api', api)
app.use('/chirp', chirp)

app.listen(3000, function (req, res) {
    console.log('Server is listening.')
});