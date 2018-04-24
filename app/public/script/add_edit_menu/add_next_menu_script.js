var list_menu_use_ingre = {}
$(document).ready(function(){
    $(".cancel").on("click",function(){
        window.location.href = "/add_edit_menu";
    })
    $(".check").on("click",function(){
        var direct = $(this).attr("dir")
        if(this.checked){
            add_ingredient(direct)
        }else{
            del_ingredient(direct)
        }
        generate_add_ingredient(list_menu_use_ingre);
        count_ingredient(list_menu_use_ingre); 
    })
})

function add_ingredient(name){
    list_menu_use_ingre[name] = 1
}
function del_ingredient(name){
    delete list_menu_use_ingre[name]
}
function generate_add_ingredient(list){
    if(Object.keys(list).length <= 0){
        $(".add_ingredient").html("")
        return
    }
    string = "<table>"
    for(var key in list){
        string +="<tr><td>"+key+"</td>"+
        "<td><input type='button' class='but_add' dir='"+key+"' value='Add'></td>"+
        "<td class='text_"+key+"'>"+list[key]+"</td>"+
        "<td><input type='button' class='but_unadd' dir='"+key+"' value='Un add'></td></tr>" 
    }
    string += "</table>"
    var but_bot = "<input type='button' class='add_menu' value='เพิ่มรายการอาหาร'>"+
                    "<input type='button' class='cancel' value='ยกเลิกรายการ'>"
    $(".add_ingredient").html(string)
    $(".button_bot").html(but_bot)
}

function count_ingredient(list){
    $(".but_add").on("click",function(){
        var direct = $(this).attr("dir")
        var temp = Number($(".text_"+direct).text())
        temp += 1
        list[direct] = temp
        $(".text_"+direct).text(list[direct])
    })
    $(".but_unadd").on("click",function(){
        var direct = $(this).attr("dir");   
        var temp = Number($(".text_"+direct).text())
        temp -= 1
        list[direct] = temp
        $(".text_"+direct).text(list[direct])
    })
    $(".cancel").on("click",function(){
        window.location.href = "/add_edit_menu";
    })
    $(".add_menu").on("click",function(){
        send_post(list_menu_use_ingre)
    })
}
function send_post(list){
    var name = $(".name_menu").text()
    var price = $(".price_menu").text()
    console.log(name + " : " + price)
    $.ajax({
        type:"POST",
        url:"/add_edit_menu/add_a_menu/success",
        data:{"data":JSON.stringify(list_menu_use_ingre),"name_menu":name,"price_menu":price},
        success: function(result){
            console.log(result)
            if(result === "success"){
                window.location.href = "/add_edit_menu"
            }
        }
    })
}