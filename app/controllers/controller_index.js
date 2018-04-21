var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    
    res.render("./user/user_index.jade",{style: "index",js:"index",title : "HOMEPAGE"});


});

module.exports = router;