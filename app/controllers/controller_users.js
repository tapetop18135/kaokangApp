var express = require("express");
var router = express.Router();
var usersDB = require("../models/users");
var user = new usersDB();

router.get("/login",function(req,res){
    
    res.render("./user/user_login.jade",{style: "login",js:"login",title : "Login Page" , longinBool :"none"});
})

router.get("/register",function(req,res){
    res.render("./user/user_register.jade",{style: "login",js:"login",title : "Login Page" , longinBool :"asdsa"});
})

router.post("/login",function(req,res){
    console.log(req.body)
    var username = req.body.username, password = req.body.password;
    var data = [username,password]
    user.showUserSelect(data,function(err,results){
        if(err){
            res.send(results)
            return;
        }else{
            if(results.length <= 0){
                // res.send("email or password are not collect")
                res.redirect("/")

            }else{
                console.log(results[0]["email"]);
                req.session.email = results[0]["email"]
                // console.log(req.session);
                res.redirect("/")
            }
            
        }
    })
    
});

router.post("/logout",function(req,res){
    if(req.body.bool === "logout"){
        req.session.destroy(function(err){
            if(err){
                res.send(err)
                console.log(err)
            }else{
                console.log("logout")
                res.send("success")
            }
        });
    }
});

router.post("/register",function(req,res){

    var username = req.body.username, email = req.body.email , password = req.body.password, name = req.body.name, surname = req.body.surname ;
        var data = [email,username,password,name,surname] ;
        user.registerUser(data,function(err,results){
            if(err){
                console.log(results)
                res.send(results)
                return 
            }else{
                console.log(results)
                res.redirect('/users/login')
            }
        })
    
})


module.exports = router;