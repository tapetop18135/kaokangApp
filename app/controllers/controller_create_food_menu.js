var express = require('express');
var router = express.Router();
var async = require('async');

var db = require('../models/store_kaokang.js');

router.get('/',function(req,res){
    db.showMenuAll(function(results){
        res.render("./user/user_create_food_menu.jade",{style: "create_food_menu",js:"create_food_menu",title : "Create Food Menu",data:results});
    })

});


router.post('/search_menu',function(req,res){
    var text = req.body.data;
    if(text === "dont"){
        db.showMenuAll(function(results){
            res.send(results);
        })
    }else{
        db.showMenu(text,function(results){
            res.send(results);
        });
    }
    
    
})

router.post('/feth_price',function(req,res){
    var n_foods = req.body;
    var temp = 0
    var data_send = {}

    async.forEachOf(n_foods,function(element,key,callback){
        
        db.showMenu_Raw(key,function(results){
            for(var i = 0; i < results.length ; i += 1){  
                temp = temp + (results[i]["quantity"]*results[i]["price_perunit"]) 
            }
            data_send[key] = temp
            temp = 0  
            callback();
        })
    },function(err){
        if(err){
            console.log(err.message);
        }
        res.send(data_send)
    })

})

router.post('/insert_history',function(req,res){
    var data = req.body;
    var d1 = JSON.parse(data.d1)
    var d2 = JSON.parse(data.d2)
    var temp = 0
    var date = new Date();
    var date_real = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    
    // console.log(Object.keys(d2).length)
    for(var k in d2){
        temp += (d1[k] * d2[k])
    }
    db.insertHistory(date_real,temp,function(result){
        if(result == "success"){
            db.insertRecord(date_real,d1,function(result){ 
                if(result === "success"){
                    res.send(true)
                }
            })
        }
    })
});

module.exports = router;