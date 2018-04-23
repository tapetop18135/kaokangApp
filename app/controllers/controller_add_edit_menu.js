var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){
    
    db.showMenuAll(function(results){
        res.render("./user/user_add_edit_menu.jade",{style: "add_edit_menu",js:"add_edit_menu",title : "ADD Menu EDIT Menu",data:results});
    })

});


module.exports = router;