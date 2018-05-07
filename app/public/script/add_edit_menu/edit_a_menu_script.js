$(document).ready(function(){
    $(".cancel").on("click",function(){
        window.location.href = "/add_edit_menu"
    })
    $(".text_q").on("input",function(){
        var dir = $(this).attr("dir")
        var q = Number($(this).val())
        var p = Number($(".text_p"+dir).text())
        var temp = q*p;
        $(".text_p_u"+dir).text(temp)
    })
    $(".delete_menu").on("click",function(){
        var menu_name = $(".menu_name_real").text()
        // var menu_name = menu_name_real;
        $.ajax({
            type:"POST",
            url:"/add_edit_menu/delete_a_menu",
            data : {"name":menu_name} ,
            success : function(data){
                if(data === "success"){
                    window.location.href = "/add_edit_menu"
                }else{
                    console.log(data)
                    alert(data)
                }
            }
        })
    })
    $(".dir_td").click(function(){
        alert($(this).text())
    })
    $(".edit_menu").on("click",function(){
        var menu_name = $(".menu_name_real").text()
        var price = $(".menu_price").val()
        var virtual_anme = $(".menu_name_vir").val()
        var text = $(".dir_td").text()
        var arr = text.split(" ");
        arr.pop()
        // var rowTable = document.getElementById("edit-table").rows.length - 1;
        var arr_q = []
        for(var i = 0 ; i < arr.length ; i+= 1){
            arr_q.push($(".text_q"+arr[i]).val())
            console.log(arr[i] + " : " + arr_q[i]);
        }
        console.log(text);
        console.log(arr);
        var menu_name = $(".menu_name_real").text()
        $.ajax({
            type:"POST",
            url:"/add_edit_menu/edit_a_menu",
            data : {arr,arr_q,menu_name,virtual_anme,price},
            success: function(result){
                if(result === "success"){
                    window.location.href = "/add_edit_menu"
                }else{
                    console.log(result)
                }

            }
        })
    })
    
})