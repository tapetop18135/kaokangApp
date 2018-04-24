$(document).ready(function(){
    $(".cancel").on("click",function(){
        window.location.href = "/add_edit_menu"
    })
    $(".next_menu").on("click",function(){
        var name_menu = $(".n_menu").val() 
        var price_menu = $(".price").val()
        var url = "/"+name_menu+"/"+price_menu
        window.location.href = "/add_edit_menu/add_a_menu"+url
    })
})