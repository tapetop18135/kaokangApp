$(document).ready(function(){
    $(".button").on("click",function(){
        var dir = $(this).attr("direct")
        var date_get = dir.split("-")
        window.location.href = "./history/list_menu/"+date_get[0]+"/"+date_get[1]+"/"+date_get[2];        
    });
    $(".cancel").on('click',function(){
        window.location.href = "/"
    })
})