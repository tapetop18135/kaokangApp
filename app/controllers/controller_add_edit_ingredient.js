var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){

    db.showRaw_materialAll(function(results){
        console.log(results)
        res.render("./user/add_edit_ingredient/user_add_edit_ingredient.jade",{style: "add_edit_ingredient",js:"add_edit_ingredient",title : "ADD ingredient EDIT ingredient",data:results});
    });
})

router.get("/add_edit_a_ingredient",function(req,res){
    res.render("./user/add_edit_ingredient/user_add_edit_a_ingredinet.jade",{style: "add_edit_menu",js:"add_edit_menu",title : "ADD Menu EDIT Menu",type_of_page:"add"});
})

module.exports = router;