$(document).ready(function(){
    $(".history").on('click',function(e){
        e.preventDefault()
        window.location.href = "./history";
    })
    $(".create_food").on('click',function(e){
        e.preventDefault()
        window.location.href = "./create_food_menu";
    })
    $(".add_edit_menu").on('click',function(e){
        e.preventDefault()
        window.location.href = "./add_edit_menu";
    })
    $(".add_edit_ingredient").on('click',function(e){
        e.preventDefault()
        window.location.href = "./add_edit_ingredient";
    })
})