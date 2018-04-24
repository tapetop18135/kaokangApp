$(document).ready(function(){
    $(".add_raw").on("click",function(){
        window.location.href = "./add_edit_ingredient/add_a_ingredient"
    })
    $(".cancel").on("click",function(){
        window.location.href = "/"
    })
    $(".search_in").on("input",function(){
        var data = $(".search_in").val()
        if(data === ""){
            show_ingredient("all");
        }else{
            show_ingredient(data);
        }
    })
    edit_menu();
})

function show_ingredient(data){
    var data_use = ""
    if(data === "all"){
        data_use = true
    }else{
        data_use = data
    }
    $.ajax({
        type:"POST",
        url:"/add_edit_ingredient/search",
        data:{"data":data_use},
        success: function(result){
            console.log(result)
            generate_ingredient(result)
        }
    })
}
function generate_ingredient(result){
    if(result.length <= 0){
        $(".show_ingredient").html("");
        return
    }
    string = "<table><tr><th>no.</th><th>ชื่อวัตถุดิบ</th><th>ราคาต่อหน่วย</th><th>หน่วย</th><th></th></tr>"
    for(var i = 0 ; i < result.length ; i+= 1){
        string += "<tr><td>"+(i+1)+"</td>"+
        "<td>"+result[i]["n_rawmaterial"]+"</td>"+
        "<td>"+result[i]["price_perunit"]+"</td>"+
        "<td>"+result[i]["unit"]+"</td>"+
        "<td class='edit' dir='"+result[i]["n_rawmaterial"]+"'>edit</td>"
        string += "</tr>"
    }
    string += "</table>";
    $(".show_ingredient").html(string);
    edit_menu();
}

function edit_menu(){
    $(".edit").on("click",function(){
        var direct = $(this).attr("dir")
        window.location.href = "./add_edit_ingredient/edit_a_ingredient/"+direct
    })
}