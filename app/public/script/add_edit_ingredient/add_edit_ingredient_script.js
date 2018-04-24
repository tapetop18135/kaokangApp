$(document).ready(function(){
    $(".edit").on("click",function(){
        var direct = $(this).attr("dir")
        window.location.href = "./add_edit_ingredient/edit_a_ingredient/"+direct
    })
    $(".add_raw").on("click",function(){
        window.location.href = "./add_edit_ingredient/add_a_ingredient"
    })
    $(".cancel").on("click",function(){
        window.location.href = "/"
    })
})