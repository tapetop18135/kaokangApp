var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){

    db.showRaw_materialAll(function(results){
        res.render("./user/add_edit_ingredient/user_add_edit_ingredient.jade",{style: "add_edit_ingredient/add_edit_ingredient",js:"add_edit_ingredient/add_edit_ingredient",title : "ADD ingredient EDIT ingredient",data:results});
    });
})

router.get("/add_a_ingredient",function(req,res){

    res.render("./user/add_edit_ingredient/user_add_edit_a_ingredinet.jade",{style: "add_edit_ingredient/add_a_ingredient",js:"add_edit_ingredient/add_a_ingredient",title : "ADD a Ingredient",type_of_page:"add"});

})

router.post("/add_a_ingredient",function(req,res){
    var data = req.body;
    db.insertIngredient(data["name"],Number(data["price"]),data["unit"],function(result){
        res.send(result);
    })
})

router.get("/edit_a_ingredient/:ingredient",function(req,res){
    res.render("./user/add_edit_ingredient/user_add_edit_a_ingredinet.jade",{style: "add_edit_ingredient/edit_a_ingredient",js:"add_edit_ingredient/edit_a_ingredient",title : "Edit a Ingredient",type_of_page:"edit"}); 
})

module.exports = router;