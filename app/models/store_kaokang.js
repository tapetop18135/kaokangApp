var mariadb  = require('mysql');


var con = mariadb.createConnection(process.env.JAWSDB_URL 
    || {
        host     : 'localhost',
        port     : '3300',
        user     : 'root',
        password : '1234',
        database : 'storekaokang'
      } );

var db_kaokang = function(){
////////////////////// history page  ///////////////////

 
    this.showHistory = (callback) => {
        var sql = "select * from history";
        con.query(sql, function (error, results, fields) {
            if (error) throw error;
            return(callback(results))
          });
    }
 
this.showListMenu = (date,callback) => {

  var sql = "select *"+  
            "from history as t0 "+
            "inner join record as t1 "+
            "on (t0.date_history = t1.date_history) "+
            "inner join menu as t2 "+
            "on (t1.n_menu = t2.n_menu) "+
            "inner join `use` as t3 "+
            "on (t2.n_menu = t3.n_menu) "+
            "inner join raw_material as t4 "+
            "on (t3.n_raw_material = t4.n_rawmaterial) "+
            "where t1.date_history = '"+date+"'"
  console.log(sql)
  con.query(sql, function (error, results, fields) {
      if (error) throw error;
      return(callback(results))
    });
}

this.showMenu = (text,callback) => {
    var sql = "select * from menu as t1 where t1.n_menu like '%"+ text +"%'";
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        return(callback(results))
    
    });
}
this.showMenuAll = (callback) => {
    var sql = "select * from menu";
    con.query(sql, function (error, results, fields) {
        if (error) console.log(error);
        return callback(results);
    });
}

this.showRaw_materialAll = (callback) => {
    var sql = "select * from raw_material";
    con.query(sql, function (error, results, fields) {
        if (error) console.log(error);
        return callback(results);
    });
}
this.showRaw_material_name = (name,callback) => {
    var sql = "select * from raw_material where n_rawmaterial like '%"+ name +"%'";
    console.log(sql)
    con.query(sql, function (error, results, fields) {
        if (error) callback([error,true]);
        return callback([results,false]);
    });
}


this.showMenu_Raw = (food,callback) => {

    var sql = "select t1.n_menu,t2.n_raw_material,t2.quantity,t3.price_perunit "+
        "from menu as t1 "+
        "inner join `use` as t2 "+
        "on (t1.n_menu = t2.n_menu) "+
        "inner join raw_material as t3 "+
        "on (t2.n_raw_material = t3.n_rawmaterial) "+
        "where t1.n_menu = '"+food+"'"
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        return callback(results);
    });
}


this.insertHistory = (date,t_price,callback) => {
    var sql = "INSERT INTO history values ( '"+date+"' , "+t_price+")";
    console.log(sql)
    con.query(sql, function (error, results, fields) {
        if (error) throw error;
        return callback("success");
    });

}
this.insertRecord = (date,menu,callback) => {
    var i = 0 
    for(var k in menu){
        var sql = 'INSERT INTO record (n_menu,date_history,num) values ("'+k+'","'+date+'",'+menu[k]+')'
        i+= 1
        con.query(sql, function (error, results, fields) {
            if (error) console.log("err");
        });
        if(i === Object.keys(menu).length){
            return callback("success")
        }
    }

}

this.insertIngredient = (n_raw_material,price_perunit,unit,callback) => {
    var sql = 'INSERT INTO storekaokang.raw_material (n_rawmaterial,price_perunit,unit) '+
           'VALUES ("'+n_raw_material+'",'+price_perunit+',"'+unit+'"); '
        con.query(sql, function (error, results, fields) {
            if (error) callback(error);
            else{
                return callback("success")
            }
        });
}


this.updateRaw_material = (name_real,name_vir,price,unit,callback) => {
    var sql = 'UPDATE raw_material as t1 '+
        'SET t1.n_rawmaterial = "'+name_vir+'" , t1.price_perunit = '+price+' , t1.unit = "'+unit+'" '+
        'WHERE t1.n_rawmaterial = "'+name_real+'"'
        con.query(sql, function (error, results, fields) {
            if (error) {
                return callback([error,true])}
            else{
                console.log("in model : "+results)
                return callback(["success",false])
            }
        });
}



this.deleteRaw_material_name = (name,callback) => {
    var sql = "DELETE FROM raw_material WHERE raw_material.n_rawmaterial = '"+name+"'"
    con.query(sql, function (error, results, fields) {
        if (error) {
            return callback([error,true])}
        else{
            return callback(["success",false])
        }
    });
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
