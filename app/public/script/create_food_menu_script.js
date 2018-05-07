var have_menu = [] 
var json_checked ={}

$(document).ready(function(){

    $(".search_text").on("input",function(){
        var text = $(this).val();
        if(text == ""){
            search_ajax("dont")
        }else{
            search_ajax(text);
        }       
    })
    select_menu_to_add_menu();
    $(".cancel").on('click',function(){
        window.location.href = "/"
    })
})

function search_ajax(text){
    $.ajax({
        type: "POST",
        url: "./create_food_menu/search_menu",
        data: {data:text},
        success: function(data){
            gen_search_show(data)
        }
    })
}


function gen_search_show(data){
    if(data.length < 1){
        $(".show_menu").html("");
        return
    }
    var string_show_html = "<table><tr><th></th><th>ชื่อเมนู</th><th>ราคา</th></tr>"
    for(var i = 0; i < data.length ; i += 1){
        if(checkDup_checkbox(data[i]["n_menu"])){
            string_show_html += "<tr><td><input type='checkbox' value='"+data[i]["n_menu"]+"' class='check_menu' checked></td>";
            string_show_html += "<td>"+data[i]["n_menu"]+"</td><td>"+data[i]["price"]+"</td>"
            string_show_html += "</tr>"
        }else{
            string_show_html += "<tr><td><input type='checkbox' value='"+data[i]["n_menu"]+"' class='check_menu' ></td>";
            string_show_html += "<td>"+data[i]["n_menu"]+"</td><td>"+data[i]["price"]+"</td>"
            string_show_html += "</tr>"
        }
        
    }
    string_show_html += "</table>" 
    $(".show_menu").html(string_show_html);
    select_menu_to_add_menu();
}

function select_menu_to_add_menu(){

    $(".check_menu").on('click',function(){
        var val = $(this).val();
        var text = '<div">'+val+'</div><br>'+
					'<button class="add-'+val+'">add</button>'+
                    '<div class="text-'+val+'">1</div>'+
                    '<button class="unadd-'+val+'">un add</button><br><br>'

        if(this.checked){ 
            if(!checkDuplicate(json_checked,text)){
                json_checked[val] = 1  
                have_menu.push(val) 
            }
        }else{
            delete json_checked[val]
            var i = 0;
			while (i < have_menu.length){
				if(have_menu[i] === val){
					break;
				}
				i++;
			}
            have_menu.splice(i,1)
        }
        generate_addMenu(json_checked);
    });
}
 
function checkDup_checkbox(arr){
    for(var i = 0; i < arr.length ; i += 1){
        if(arr === have_menu[i]){
            return true
        }
    }
    return false
}

function checkDuplicate(obj,text){
    for(var key in obj){
        if(obj[key] === text){
            return true
        }
    }
    for(var i = 0 ; i < have_menu.length ; i++){
        if(have_menu[i] === text){
        }
    }

    return false
}

function generate_addMenu(arr){
    var string = "<table>"
    var state = 0;
    for(var key in arr){
        state = 1
        string += "<tr>"
        string += "<td>"+key+"</td><td><button class='add' dir='"+key+"'>+</button></td><td><div class='count_"+key+"'>"+arr[key]+"</div></td><td><button class='unadd' dir='"+key+"'>-</button></td>"
        string += "</tr>"
    }
    if(state == 1){
        var but = "<button class='add_Menu'>สร้างใบรายการ</button>"
    }else{
        var but = ""
    }
    string += "</table><br><br>"+but
    $(".add_menu").html(string)

    $(".add").on('click',function(){
        var dir = $(this).attr("dir")
        var num = Number($(".count_"+dir).text());
        num += 1;
        json_checked[dir] = num
        $(".count_"+dir).text(num)
    })
    $(".unadd").on('click',function(){
        var dir = $(this).attr("dir")
        var num = Number($(".count_"+dir).text());
        if(num <= 1){
            return
        }
        num -= 1
        json_checked[dir] = num
        $(".count_"+dir).text(num)
    })

    $(".add_Menu").on('click',function(){
        insert_create_menu()
    })
    
}
function insert_create_menu(){
    for(var k in json_checked){
        if(json_checked[k] == typeof ''){
            json_checked[k] = 1
        }
    }
    $.ajax({
        type: "POST",
        url: "./create_food_menu/feth_price",
        data: json_checked,
        success: function(data){
            insert_history(data);
        }
    })
}
function insert_history(data){
    $.ajax({
        type: "POST",
        url: "./create_food_menu/insert_history",
        data: {"d1":JSON.stringify(json_checked),"d2":JSON.stringify(data)},
        success: function(result){
            
            console.log(result)
            var date = new Date();
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            var date_s = date.getDate().toString()
            if(date_s.length == 1){
                var dateR = "0"+date_s
            }else{
                var dateR = date_s
            }
            var d = "/history/list_menu/"+dateR+"/"+months[date.getMonth()]+"/"+date.getFullYear();
            
            if(result === true){
                // console.log(d)
                window.location.href = d
            }else if(result === "err"){
                alert("สร้างได้แค่ 1 วันนะแจะรอพรุ่งนี้ค่อยสร้างใหม่");
            }
        }
    })
}
