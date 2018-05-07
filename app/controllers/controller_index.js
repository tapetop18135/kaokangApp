var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    var loginboolean = '';
    if(!req.session.email){
        loginboolean = false
    }else{
        loginboolean = true
    }
    res.render("./user/user_index.jade",{style: "index",js:"index",title : "HOMEPAGE" , longinBool : loginboolean});


});

module.exports = router;