$(document).ready(function(){
    $(".cancel").on("click",function(){
        window.location.href = "/add_edit_ingredient"
    })
    $(".delete").on("click",function(){
        var name_real = $(".name_ingredient").text()
        $.ajax({
            type:"POST",
            url:"./delete_ingredient",
            data: {"name_real":name_real},
            success : function(result){
                console.log(result)
                if(result === "success"){
                    window.location.href = "/add_edit_ingredient"
                }else{
                    console.log(result)
                }
            }
        });
    })
    $(".edit_ingredient").on("click",function(){
        var name_real = $(".name_ingredient").text(); 
        var name_vir = $(".name_in_vir").val();
        var price = $(".price").val();
        var unit = $(".unit").val();
        console.log(name_real+ " " + name_vir);

        $.ajax({
            type:"POST",
            url:"./update_ingredient",
            data: {"name_real":name_real ,"name_vir":name_vir,"price":price , "unit":unit},
            success : function(result){
                if(result === "success"){
                    window.location.href = "/add_edit_ingredient"
                }else{
                    console.log(result)
                }
            }
        });


    }) 
})