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
})