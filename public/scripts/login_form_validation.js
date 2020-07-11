// Login form validation script

$(document).ready(function(){
    $(".btn").click(function(){
    var name=$("#InputUsername").val();
    var passw=$("#InputPassword").val();
    if(name=="")
    {
        $("#InputUsername").css("border-color","red");
        $("#unameerror").text("Please enter username").css("color","red");
    }
    else
    {
        $("#InputUsername").css("border-color","skyblue");
        $("#unameerror").text("");
    }
    if(passw=="")
    {
        $("#InputPassword").css("border-color","red");
        $("#passwerror").text("Please enter password").css("color","red");
    }
    else
    {
        $("#InputPassword").css("border-color","skyblue");
        $("#passwerror").text("");
    }
    
    })
});