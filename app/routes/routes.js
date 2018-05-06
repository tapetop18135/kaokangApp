
var user_index = require("../controllers/controller_index.js")
var user_history = require("../controllers/controller_history.js")
var user_create_food_menu = require("../controllers/controller_create_food_menu.js")
var user_add_edit_menu = require("../controllers/controller_add_edit_menu.js");
var user_add_edit_ingredient = require("../controllers/controller_add_edit_ingredient.js");
var user_about = require("../controllers/controller_about.js")

var routes_user = function(app){
    
    app.use("/",user_index);
    app.use("/history",user_history);
    app.use("/create_food_menu",user_create_food_menu);  
    app.use("/add_edit_menu",user_add_edit_menu);
    app.use("/add_edit_ingredient",user_add_edit_ingredient);
    app.use("/about",user_about);
    
} 

module.exports = routes_user;

