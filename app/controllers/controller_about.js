var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    res.render("./user/user_about.jade",{title:"About"});  
})

module.exports = router;