
var user_index = require("../controllers/controller_index.js")
var user_history = require("../controllers/controller_history.js")
var user_create_food_menu = require("../controllers/controller_create_food_menu.js")


var routes_user = function(app){
    
    app.use("/",user_index);
    app.use("/history",user_history);
    app.use("/create_food_menu",user_create_food_menu);
    
} 

module.exports = routes_user;

