const express = require('express');
const morgan = require('morgan');
const jade = require('jade');

var bodyParser = require('body-parser');
var session = require('express-session');


const app = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret:"secret123",
    saveUninitialized:true,
    resave:true
}))

app.set("views","./app/views");
app.set("view engine","jade");


app.use(express.static('./app/public'));

const PORT = process.env.PORT || 5000;

var routes = require("./app/routes/routes")(app);
app.listen(PORT,() => {
    console.log("connect server port "+PORT);
})



