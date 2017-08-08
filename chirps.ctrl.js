var path = require('path')
var newID= require('./id')
var jsonPath = path.join(__dirname, 'data.json');
var url = require('url');
var express = require("express")
var router = express.Router()
var fs = require('fs');
var postTime= require('./moment')
// var path = require('path')
// var jsonPath = path.join(__dirname, 'data.json');
router.route('/')
    .get(function (req, res) {
        fs.readFile(jsonPath, function (err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }
            res.write(file);
            res.end();
        });
        console.log('GET')
    })
    .post(newID.ID, postTime.Time, function (req, res) {
        fs.readFile(jsonPath, 'utf-8', function (err, file) {
            var arr = JSON.parse(file)

            
            
            arr.push(req.body);
            fs.writeFile(jsonPath, JSON.stringify(arr), function (err, success) {
                if (err) {
                    res.writeHead(500);
                    res.end('Data not successfully stored.');
                } else {
                    res.writeHead(201, 'Created');
                    res.end(JSON.stringify(arr));
                }
            })
        })
    })

router.route('/one/:id')
.get(function (req, res) {
        // var parsedUrl = url.parse(req.url)
        fs.readFile(jsonPath, 'utf-8', function (err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }
            var arr = JSON.parse(file);
            var result;
            arr.forEach(function (a) {
                if (a.id === req.params.id) {
                    result = a;
                }
            })
            if (result === undefined) {
                res.writeHead(404, 'NOT FOUND');
                res.end();
            } else {
                res.writeHead(200, 'OK');
                res.end(JSON.stringify(result));
            }
        })
        console.log('GET ONE')
    })
    .put(function (req, res) {
        fs.readFile(jsonPath, 'utf-8', function (err, file) {
            var arr = JSON.parse(file)
            var result
            arr.forEach(function (a) {
                if (a.id === req.params.id) {
                    result = a;
                    id = result.id
                    result.user = req.body.user
                    result.message = req.body.message
                }
            })
            fs.writeFile(jsonPath, JSON.stringify(arr), function (err, success) {
                if (err) {
                    res.writeHead(500);
                    res.end('Data not successfully stored.');
                } else {
                    res.writeHead(201, 'Chirp modified.');
                    res.end(JSON.stringify(arr))
                }
            })
        })
        console.log('PUT')
    })
    .delete(function (req, res) {
        fs.readFile(jsonPath, 'utf-8', function (err, file) {
            if (err) {
                res.writeHead(500);
                res.end('File could not be Deleted.');
            }
            var arr = JSON.parse(file);
            var result;
            arr.forEach(function (a) {
                if (a.id === req.params.id) {
                    result = a;
                    var place = arr.indexOf(result)
                    arr.splice(place, 1)
                }
            });
            fs.writeFile(jsonPath, JSON.stringify(arr), function (err, success) {
                if (result === undefined) {
                    res.writeHead(404, 'NOT FOUND');
                    res.end();
                } else {
                    res.writeHead(200, 'POST DELETED');
                    res.end();
                }
            })
        })
        console.log('DELETE')
    });
console.log("inchirps.ctrl")

module.exports = router
