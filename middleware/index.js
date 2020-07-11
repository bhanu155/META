var middlewareObj={};
var Project=require("../data_schema/project");
var Module=require("../data_schema/module");

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated())
		{
			return next();
		}
	res.redirect('/login_manager');
};

middlewareObj.checkProjectOwnership = function(req, res, next){
	//is user logged in ?
	if(req.isAuthenticated()){
		Project.findById(req.params.id, (err, foundProject)=>{
		if(err)
			{
				res.redirect("back");
			}
		else
			{
				//is the project is owned by the logged in user ?
				if(foundProject.author.id.equals(req.user._id))
					{
						next();
					}	
				else
					{
						res.send("back");
					}
			}
		});
	}	
	else
	{
		res.redirect("back");
	}
};

middlewareObj.checkModuleOwnership = function(req, res, next){
	//is user logged in ?
	if(req.isAuthenticated()){
		Module.findById(req.params.id, (err, foundModule)=>{
		if(err)
			{
				res.redirect("back");
			}
		else
			{
				//is the module owned by the project
				Project.findById( foundModule.parentProject.id, (err, foundProject)=>{
					if(foundProject.author.id.equals(req.user._id))
						{
							next();
						}	
					else
						{
							res.send("back");
						}
				}); 
				
			}
		});
	}	
	else
	{
		res.redirect("back");
	}
};

module.exports= middlewareObj;