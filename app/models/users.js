var connect = require("./store_kaokang");
var con = connect.connectDB()

var Users = function(){
    
    this.registerUser = function(data,callback){
        var sql = 'insert into user values( ? , ? , ? , ? , ? )'
        con.query(sql,data,function(err,results){
            if(err){
                return callback(true,err);
            }else{
                return callback(false,results);
            }
        });
    }
    this.showUserAll = function(callback){
        con.query("select * from user",function(err,results){
            if(err){
                return callback(true,err);
            }else{
                return callback(false,results);
            }
        });
    }
    this.showUserSelect = function(data,callback){
        con.query("select * from user where email = ? and password = ?",data,function(err,results){
            if(err){
                return callback(true,err)
            }else{
                return callback(false,results)
            }
        })
    }

}


module.exports = Users;