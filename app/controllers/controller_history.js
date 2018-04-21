var express = require('express');
var router = express.Router();

var db = require("../models/store_kaokang.js");


router.get("/",function(req,res){
    db.showHistory(function(results){
        var date_use = []
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        for(var i = 0 ; i < results.length ; i += 1){
            var date = new Date(results[i]["date_history"])
            var s = date.getDate().toString()
            if(s.length == 1){
                var dateR = "0"+s   
                date_use.push(dateR+"-"+months[(date.getMonth())]+"-"+date.getFullYear());
            }else{    
                date_use.push(s+"-"+months[(date.getMonth())]+"-"+date.getFullYear());
            }
        }
        res.render("./user/user_history.jade",{style: "history",js:"history",title : "HISTORY",
        data_history : results,date:date_use});
    })
  
})


router.get("/list_menu/:date/:month/:year",function(req,res){
    var date = req.params.date, month = req.params.month , year = req.params.year
    var date_show = date+" "+month+" "+year
    
    var month_num = {January:"01",February:"02",March:"03",April:"04",May:"05",June:"06",July:"07",August:"08",September:"09",October:"10",November:"11",December:"12"}
    var month_num_real = 0
    for(var key in month_num){
        if(key === month){
            month_num_real = month_num[key]
        }
    }

    var date_serach = year+"-"+month_num_real+"-"+date ;
    db.showListMenu(date_serach,function(results){
        res.render("./user/user_list_menu.jade",{style: "list_menu",js:"list_menu",title : "MENU : "+date_show,head:date_show,data:results})
    })


})


module.exports = router;