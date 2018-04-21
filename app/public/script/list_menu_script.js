$(document).ready(function(){
    $(".print_page").on("click",function(e){
        e.preventDefault();
        window.print();
    })
    $(".cancel").on('click',function(){
        window.location.href = "/history"
    })
})