$(document).ready(function(){
    $(".edit").on("click",function(){
        alert("edit")
    })
    $(".add_menu").on("click",function(){
        window.location.href = "./add_edit_menu/add_edit_a_menu"
    })
    $(".cancel").on("click",function(){
        window.location.href = "/"
    })
})