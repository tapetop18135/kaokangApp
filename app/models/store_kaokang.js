var mariadb  = require('mysql');
var assert = require('assert');


var con = mariadb.createConnection(process.env.JAWSDB_MARIA_URL);

var db_kaokang = function(){
////////////////////// history page  ///////////////////

 
    this.showHistory = (callback) => {
        var sql = "select * from storekaokang.history";
        con.query(sql, function (error, results, fields) {
            if (error) throw error;
            return(callback(results))
          });
    }
 
this.showListMenu = (date,callback) => {

  var sql = "select *"+  
            "from storekaokang.history as t0 "+
            "inner join storekaokang.record as t1 "+
            "on (t0.date_history = t1.date_history) "+
            "inner join storekaokang.menu as t2 "+
            "on (t1.n_menu = t2.n_menu) "+
            "inner join storekaokang.use as t3 "+
            "on (t2.n_menu = t3.n_menu) "+
            "inner join storekaokang.raw_material as t4 "+
            "on (t3.n_raw_material = t4.n_rawmaterial) "+
            "where t1.date_history = '"+date+"'"
  console.log(sql)
  con.query(sql, function (error, results, fields) {
      if (error) throw error;
      return(callback(results))
    });
}

this.showMenu = (text,callback) => {
    var sql = "select * from storekaokang.menu as t1 where t1.n_menu like '%"+ text +"%'";
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        return(callback(results))
    
    });
}
this.showMenuAll = (callback) => {
    var sql = "select * from storekaokang.menu";
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        return callback(results);
    });
}

this.showMenu_Raw = (food,callback) => {

    var sql = "select t1.n_menu,t2.n_raw_material,t2.quantity,t3.price_perunit "+
        "from storekaokang.menu as t1 "+
        "inner join storekaokang.use as t2 "+
        "on (t1.n_menu = t2.n_menu) "+
        "inner join storekaokang.raw_material as t3 "+
        "on (t2.n_raw_material = t3.n_rawmaterial) "+
        "where t1.n_menu = '"+food+"'"
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        return callback(results);
    });
}

this.insertHistory = (t_price,callback) => {
    var sql = "INSERT INTO storekaokang.history (total_price) values ("+t_price+")";
    con.query(sql, function (error, results, fields) {
        if (error) console.log("err");
        return callback("success");
    });

}
this.insertRecord = (date,menu,callback) => {
    var i = 0 
    for(var k in menu){
        var sql = 'INSERT INTO storekaokang.record (n_menu,date_history,num) values ("'+k+'","'+date+'",'+menu[k]+')'
        i+= 1
        con.query(sql, function (error, results, fields) {
            if (error) console.log("err");
        });
        if(i === Object.keys(menu).length){
            callback("success")
        }
    }

}

///////////////////////////////////////////////////////

    // this.showMenu = () => {
    //     var sql = "select * from storekaokang.menu";
    //     con.query(sql, function (error, results, fields) {
    //         if (error) throw error;
    //         console.log(results);
    //       });
    // }
    // this.showRaw_material = () => {
    //     var sql = "select * from storekaokang.raw_material";
    //     con.query(sql, function (error, results, fields) {
    //         if (error) throw error;
    //         // connected!
    //         console.log(results);
    //       });
    // }
    // this.showRecord = () => {
    //     var sql = "select * from storekaokang.record ";
    //     con.query(sql, function (error, results, fields) {
    //         if (error) throw error;
    //         // connected!
    //         console.log(results);
    //       });
    // }
    // this.showUse = () => {
    //     var sql = "select * from storekaokang.use";
    //     con.query(sql, function (error, results, fields) {
    //         if (error) throw error;
    //         console.log(results);
    //       });
    // }

    
}

module.exports = new db_kaokang();
// db = new db_kaokang();

// db.showHistory(function(r,b){
//   console.log(b)
//   console.log(r)
// });


// db.showRaw_material();
// db.showRecord();
// db.showUse();
