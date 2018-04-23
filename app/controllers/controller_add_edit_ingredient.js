var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){

    db.showRaw_materialAll(function(results){
        console.log(results)
        res.render("./user/user_add_edit_ingredient.jade",{style: "add_edit_ingredient",js:"add_edit_ingredient",title : "ADD ingredient EDIT ingredient",data:results});
    });
   
   


})

module.exports = router;