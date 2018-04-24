var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){
    
    db.showMenuAll(function(results){
        res.render("./user/add_edit_menu/user_add_edit_menu.jade",{style: "add_edit_menu",js:"add_edit_menu",title : "ADD Menu EDIT Menu",data:results});
    })

});

router.get("/add_edit_a_menu",function(req,res){
    res.render("./user/add_edit_menu/user_add_edit_a_menu.jade",{style: "add_edit_a_menu",js:"add_edit_a_menu",title : "ADD Menu EDIT A Menu",type_of_page:"add"});

})


module.exports = router;