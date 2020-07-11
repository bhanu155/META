// Validation for signup form

$(document).ready(function()
{
    $(".btn").click(function()
    {
        var name=$("#InputUsername").val();
        var email=$("#InputEmail").val();
		var passw=$("#InputPassword").val();
		var cpassw=$("#InputPasswordConfirmation").val();
		if(name=="")
		{
			$("#InputUsername").css("border-color","red");
			$("#usererror").text("Please enter username").css("color","red");
		}
		else
		{
			$("#InputUsername").css("border-color","skyblue");
			$("#usererror").text("");
		}
		if(email=="")
		{
			$("#InputEmail").css("border-color","red");
			$("#emailerror").text("PLease enter email").css("color","red");
		}
		else
		{
			$("#InputEmail").css("border-color","skyblue");
			$("#emailerror").text("");
		}
			
		if(passw=="")
		{
			$("#InputPassword").css("border-color","red");
			$("#passerror").text("Please enter password").css("color","red");
		}
		else
		{
			$("#InputPassword").css("border-color","skyblue");
			$("#passerror").text("");
		}
		if(cpassw=="")
		{
			$("#InputPasswordConfirmation").css("border-color","red");
			$("#cpasserror").text("Please enter password").css("color","red");
		}
		
		else if(cpassw==passw)
		{
			$("#InputPasswordConfirmation").css("border-color","skyblue");
			$("#cpasserror").text("");
		}
		else
		{
			$("#InputPasswordConfirmation").css("border-color","red");
			$("#cpasserror").text("Pssword doesn't match").css("color","red");
		}
    })
});