$(document).ready(function(){
    $(".cancel").on("click",function(){
        window.location.href = "/add_edit_ingredient"
    }) 
    $(".add_ingredient").on("click",function(){
        
        var name_in = $(".name_in").val();
        var price_per = $(".price").val();
        var unit = $(".unit").val();
        
        $.ajax({
            type:"POST",
            url:"./add_a_ingredient",
            data:{  "name":name_in , "price":price_per , "unit":unit ,},
            success:function(result){
                if(result === "success"){
                    window.location.href = "/add_edit_ingredient"
                }else{
                    console.log(result)
                }
            }
        })
    })
})