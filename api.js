var express= require("express")
var chirps = require("./chirps.ctrl.js")
var router = express.Router()
router.use("/chirps", chirps)
module.exports = router; 
