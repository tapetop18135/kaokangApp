$(document).ready(function(){
    $(".edit").on("click",function(){
        var direct = $(this).attr("dir")
        console.log(direct)
        window.location.href = "./add_edit_menu/edit_a_menu/"+direct
    })
    $(".add_menu").on("click",function(){
        window.location.href = "./add_edit_menu/add_a_menu"
    })
    $(".cancel").on("click",function(){
        window.location.href = "/"
    })
    
})