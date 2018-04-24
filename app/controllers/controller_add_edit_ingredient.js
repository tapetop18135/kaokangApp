var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){

    db.showRaw_materialAll(function(results){
        res.render("./user/add_edit_ingredient/user_add_edit_ingredient.jade",{style: "add_edit_ingredient/add_edit_ingredient",js:"add_edit_ingredient/add_edit_ingredient",title : "ADD ingredient EDIT ingredient",data:results});
    });
})

router.post("/search",function(req,res){
    var data = req.body
    if(data["data"] === "true"){
        db.showRaw_materialAll(function(result){
            res.send(result)
            // console.log(result)
        })
    }else{
        db.showRaw_material_name(data["data"],function(result){
            console.log(result[1])
            if(result[1] === true){
                res.send(result[0])
                // console.log(result[0])
            }else{
                res.send(result[0])
                // console.log(result[0])
            }
        })
    }
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
    var name = req.params.ingredient;
    db.showRaw_material_name(name,function(result){
        if(result[1] === true){
            res.send(result[0])
        }else{
            console.log(result[0])
            res.render("./user/add_edit_ingredient/user_add_edit_a_ingredinet.jade",{style: "add_edit_ingredient/edit_a_ingredient",js:"add_edit_ingredient/edit_a_ingredient",title : "Edit a Ingredient",type_of_page:"edit",data:result[0]}); 
        }
    })
    
})

router.post("/edit_a_ingredient/update_ingredient",function(req,res){
    var data = req.body
    console.log(data)
    db.updateRaw_material( data["name_real"],data["name_vir"],Number(data["price"]),data["unit"],function(result){
        if(result[1] === true){res.send(result[0])}
        else{
            res.send(result[0])
        }
    })
});

router.post("/edit_a_ingredient/delete_ingredient",function(req,res){
    var data = req.body
    db.deleteRaw_material_name(data["name_real"],function(result){
        res.send(result[0])
    })
})

module.exports = router;