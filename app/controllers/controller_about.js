var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    var loginboolean = '';
    if(!req.session.email){
        loginboolean = false
    }else{
        loginboolean = true
    }
    res.render("./user/user_about.jade",{username:req.session.user ,title:"About" , longinBool :loginboolean});  
})

module.exports = router;