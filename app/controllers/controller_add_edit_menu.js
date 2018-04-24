var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){
    
    db.showMenuAll(function(results){
        res.render("./user/add_edit_menu/user_add_edit_menu.jade",{style: "add_edit_menu/add_edit_menu",js:"add_edit_menu/add_edit_menu",title : "ADD Menu EDIT Menu",data:results});
    })

});

router.get("/add_a_menu",function(req,res){
    res.render("./user/add_edit_menu/user_add_edit_a_menu.jade",{style: "add_edit_menu/add_a_menu",js:"add_edit_menu/add_a_menu",title : "ADD a Menu",type_of_page:"add"});

})

router.get("/edit_a_menu/:menu",function(req,res){
    console.log(req.params["menu"])
    db.showRaw_menu_name(req.params["menu"],function(result){
        if(result[1] === true){
            res.send(result[0])
        }else{
            // console.log(result[0])
            res.render("./user/add_edit_menu/user_add_edit_a_menu.jade",{style: "add_edit_menu/edit_a_menu",js:"add_edit_menu/edit_a_menu",title : "Edit a Menu",type_of_page:"edit",data:result[0]}); 
        } 
    })
    
})

router.get("/add_a_menu/:name/:price",function(req,res){
    var name = req.params["name"]
    var price = req.params["price"]
    db.showRaw_materialAll(function(results){
        res.render("./user/add_edit_menu/user_add_next_menu.jade",{style: "add_edit_menu/add_next_menu",js:"add_edit_menu/add_next_menu",title : "ADD a Menu Next",name:name,price:price,data:results})
    })

})

router.post("/add_a_menu/success",function(req,res){
    var data = JSON.parse(req.body["data"])
    var name = req.body["name_menu"] , price = req.body["price_menu"]
    console.log(data + " " +name+ " " + price)
    db.insertMenu(name,Number(price),function(results){
        if(results[1] === true){
            res.send(results[0])
        }else{
            var i = 0
            for(var key in data){  
                db.insertMenu_use(name,key,data[key],function(result){
                    if(result[1] === true){
                        res.send(result[0])
                    }else{
                        console.log(result[0])
                    }
                })
                i+=1
                console.log(i)
                if(i == (Object.keys(data).length)-1){
                    console.log("success")
                    res.send("success")
                }
            }
            // res.send(results[0])
        }
    })
})


module.exports = router;