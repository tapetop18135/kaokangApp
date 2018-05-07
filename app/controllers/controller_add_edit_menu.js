var express = require("express");
var router = express.Router();
var db = require("../models/store_kaokang.js");

router.get("/",function(req,res){
    
    db.showMenuAll(function(results){
        res.render("./user/add_edit_menu/user_add_edit_menu.jade",{longinBool :true ,style: "add_edit_menu/add_edit_menu",js:"add_edit_menu/add_edit_menu",title : "ADD Menu EDIT Menu",data:results});
    })

});

router.get("/add_a_menu",function(req,res){
    res.render("./user/add_edit_menu/user_add_edit_a_menu.jade",{longinBool :true ,style: "add_edit_menu/add_a_menu",js:"add_edit_menu/add_a_menu",title : "ADD a Menu",type_of_page:"add"});

})

router.get("/edit_a_menu/:menu",function(req,res){
    console.log(req.params["menu"])
    db.showRaw_menu_name(req.params["menu"],function(result){
        if(result[1] === true){
            res.send(result[0])
        }else{
            // console.log(result[0])
            res.render("./user/add_edit_menu/user_add_edit_a_menu.jade",{longinBool :true ,style: "add_edit_menu/edit_a_menu",js:"add_edit_menu/edit_a_menu",title : "Edit a Menu",type_of_page:"edit",data:result[0]}); 
        } 
    })
    
})

router.get("/add_a_menu/:name/:price",function(req,res){
    var name = req.params["name"]
    var price = req.params["price"]
    db.showRaw_materialAll(function(results){
        res.render("./user/add_edit_menu/user_add_next_menu.jade",{longinBool :true ,style: "add_edit_menu/add_next_menu",js:"add_edit_menu/add_next_menu",title : "ADD a Menu Next",name:name,price:price,data:results})
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


router.post('/delete_a_menu',function(req,res){
    console.log(req.body)
    db.deleteUse(req.body["name"],function(err,results){

        if(err){
            console.log(results)
            res.send(results)
            return
        }else{
            db.deleteRecord(req.body["name"],function(err,result){
                if(err){
                    console.log(result)
                    res.send(result)
                    return
                }else{
                    db.deleteMenu(req.body["name"],function(err,reslt){
                        if(err){
                            console.log(reslt)
                            res.send(reslt)
                            return
                        }else{
                            res.send("success")
                        }
                    })
                }
            })
        }

    })
});

router.post('/edit_a_menu',function(req,res){
    var arr = []
    for(var k in req.body){
        arr.push(req.body[k]);
    }
    var string = "UPDATE `use` SET quantity = (case "
    var name_menu = arr[2]
    console.log(arr)
    for(var i = 0 ; i < arr[0].length ; i += 1){
        string += "when n_raw_material = '"+arr[0][i]+"' then "+Number(arr[1][i])+" "
    }

    string += "end) WHERE n_menu = '"+name_menu+"'"

    db.writeQuery(string,function(err,results){
        if(err){
            res.send(results)
        }else{
            res.send("success")
        }
    })

});

module.exports = router;

