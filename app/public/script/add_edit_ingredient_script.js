$(document).ready(function(){
    $(".edit").on("click",function(){
        alert("edit")
    })
    $(".add_raw").on("click",function(){
        window.location.href = "./add_edit_ingredient/add_edit_a_ingredient"
    })
    $(".cancel").on("click",function(){
        window.location.href = "/"
    })
})