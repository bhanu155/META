var express=require("express");
var	router=express.Router();
var passport=require("passport");
var User=require("../data_schema/user");
var Employee=require("../data_schema/employee");
var Project=require("../data_schema/project");
var Module=require("../data_schema/module");
var middleware=require("../middleware");

var MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res)=>{
	res.render("home");
});
router.get('/dashboard', middleware.isLoggedIn,(req, res)=>{
	
	Project.find({}, (err, allProjects)=>{
		if(err)
			{
				console.log(err);
				res.redirect('/');
			}
		else
			{	
				Module.find({}, (err, allModules)=>{
					if (err){
						throw err;
					}else{
						res.render("dashboard", {projects: allProjects, modules: allModules});
					}	
				});
			}
	});
});
router.get('/dashboard_emp/:id', (req, res)=>{
	Employee.findById(req.params.id, (err, foundEmployee)=>{
		if(err){
			throw err;
		}else{
			Module.findById(foundEmployee.currentModule.id, (err, foundModule)=>{
					res.render("dashboard_emp", {employee: foundEmployee, module:foundModule});
			});	
		}
	});
});
//show all archivedProjects
router.get("/archivedProjects", (req, res)=>{
	Project.find({}, (err, allProjects)=>{
		if(err)
			{
				console.log(err);
				res.redirect('/');
			}
		else
			{	
				Module.find({}, (err, allModules)=>{
					if (err){
						throw err;
					}else{
						res.render("archivedProjects", {projects: allProjects, modules: allModules});
					}	
				});
			}
	});
});

// REST API for Projects----------------------------------------------------------------------

//index -> list of all projects -> /dashboard
//new -> from dashboard pop up form
//create -> /projects ->POST
router.post('/projects', middleware.isLoggedIn, (req, res)=>{
	var today = new Date().toLocaleDateString('en-US');
	var dl = req.body.deadlineDate;
	console.log(today);
	console.log(dl);
	function parseDate(str) {
    	var mdy = str.split('/');
    	return new Date(mdy[2], mdy[0]-1, mdy[1]);
	}
	function datediff(first, second) {
    	// Take the difference between the dates and divide by milliseconds per day.
    	// Round to nearest whole number to deal with DST.
    	return Math.round((second-first)/(1000*60*60*24));
	}
	
	var dd = datediff(parseDate(today), parseDate(dl)) // date difference
	
	var project = {
		projectName: req.body.projectName,
		startDate: today,
		deadline: dl,
		// timeRemaining = Deadline date - current date
		duration: dd,
		percentCompleted: 0,
		archived: false,
		numberOfModules: 0,
		backlogModules: 0,
		inProgressModules: 0,
		finishedModules: 0,
		actualDuration: 0,
		author:{
			id: req.user._id,
			username: req.user.username,
			email: req.user.email,
		}
	}
	
	Project.create(project, (err, createdProject)=>{
		if(err)
			{
				console.log(err);
			}
		else
			{	
				console.log(createdProject);
				res.redirect('/dashboard');
			}
	});	
});

//show -> /projects/:id  -> GET 
router.get('/projects/:id', middleware.isLoggedIn, (req, res)=>{
	//find the project
	Project.findById(req.params.id, (err, foundProject)=>{
		if(err)
			{
				console.log(err);
			}
		else
			{	
				//find all modules for the project
				Module.find({}, (err, allModules)=>{
					if(err)
						{
							console.log(err);
						}
					else
						{	
							res.render("project_info", {project: foundProject, modules: allModules});
						}
				});
				
			}
	});
	
});

//edit -> /projects/id/edit -> GET -> leads to the edit form - pop up

//update -> /projects/:id -> POST -> updates the project data -> redirect to /projects/:id (GET)
router.put('/projects/:id',	middleware.checkProjectOwnership, (req, res)=>{
	var myquery = { _id: req.params.id };
  	var newvalues = { $set: {
							projectName: req.body.projectName,
							deadline: req.body.deadlineDate,
						}	 
	};
	
  	Project.updateOne(myquery, newvalues, function(err, result) {
    	if (err){
			throw err;
		}else{
			res.redirect('/projects/'+ req.params.id);
		}
    });
});	
// archive project
router.put('/archiveProject/:id',	middleware.checkProjectOwnership, (req, res)=>{
	var myquery = { _id: req.params.id };
  	var newvalues = { $set: {
							archived:true
						}	 
	};
  	Project.updateOne(myquery, newvalues, function(err, result) {
    	if (err){
			throw err;
		}else{
			res.redirect('/dashboard');
		}
    });
});	

//destroy -> /projects/:id -> DELETE -> delete and redirect
router.delete('/projects/:id', middleware.checkProjectOwnership, (req, res)=>{

	Project.findByIdAndRemove(req.params.id, (err)=>{
		res.redirect('/dashboard');
	});
});

// REST API for Modules----------------------------------------------------------------------------
//index -> manager dashboard
//new -> pop up form on manager dashboard
//create
router.post("/modules", middleware.isLoggedIn, (req, res)=>{
	var today = new Date().toLocaleDateString('en-US');
	module= {startDate:today,
			 moduleName: req.body.moduleName,	 
			 status: "backlog",	
			 kloc: 0,
			 effort:0,
			 staffReq:req.body.staffRequired,
			 staffCurr:0,
			 dueDate:req.body.dueDate,
			 finishDate: today,	
			 rating:0,
			 deadlineIndex:0,
			 tasksTodo:0,
			 tasksFinished:0,
			 parentProject: {
					id: req.body.parentProject_id,
					projectName: req.body.parentProjectName
				}
			}
	
	Module.create(module, (err, createdModule)=>{
		if(err)
			{
				console.log("error");
			}
		else
			{	
				//update parent project data here
				var myquery = { _id: req.body.parentProject_id };
				var newvalues = { $inc: {
										backlogModules: 1,
										numberOfModules: 1,
									}	 
				};
				Project.updateOne(myquery, newvalues, function(err, result) {
					if (err){
						throw err;
					}else{
						console.log(createdModule);
						res.redirect('/projects/'+req.body.parentProject_id);
					}
				});
			}
	});
});
//show
router.get("/modules/:id", middleware.isLoggedIn, (req, res)=>{
	Module.findById(req.params.id, (err, foundModule)=>{
		if(err)
			{
				console.log(err);
			}
		else
			{
				Project.findById(foundModule.parentProject.id, (err, foundProject)=>{
					if(err){
						throw err;
					}else{
						res.render("module_info", {module: foundModule, parentProject: foundProject});
					}
				});
			}
	});
});

//edit -> pop up form on module_info page
//update
router.put('/modules/:id',	middleware.checkModuleOwnership , (req, res)=>{
	var today= new Date();
	var myquery = { _id: req.params.id };
  	var newvalues = { $set: {
							moduleName: req.body.moduleName,
							dueDate: req.body.dueDate,
							finishDate: today	
						}	 
	};
	
  	Module.updateOne(myquery, newvalues, function(err, result) {
    	if (err){
			throw err;
		}else{
			res.redirect('/modules/'+req.params.id);
		}
    });
});
router.put('/moduleTaskUpdate/:id',	middleware.checkModuleOwnership , (req, res)=>{
	var today= new Date();
	var myquery = { _id: req.params.id };
  	var newvalues = { $set: {
							tasksTodo: req.body.total,
							tasksFinished: req.body.done
						}	 
	};
  	Module.updateOne(myquery, newvalues, function(err, result) {
    	if (err){
			throw err;
		}else{
			res.redirect('/modules/'+req.params.id);
		}
    });
});

//destroy
router.delete('/modules/:id', middleware.checkModuleOwnership, (req, res)=>{
	Module.findByIdAndRemove(req.params.id, (err)=>{
		res.redirect('/dashboard');
	});
});
//Module state change------------------------------------------------------
router.put("/start_module/:idMod/:idPro", (req, res)=>{
	var today= new Date().toLocaleDateString('en-US');
	var myquery = {_id:req.params.idMod };
	var newVal = { $set:{
						status: 'progress',
						startDate: today
					}
	};
	Module.updateOne(myquery, newVal, function(err, result){
		if(err){
			throw err;
		}else{
			var mq = { _id: req.params.idPro };
			var nv = { $inc: {
									inProgressModules: 1,
									backlogModules:-1
								}	 
			};
			Project.updateOne(mq, nv, function(err, result) {
				if (err){
					throw err;
				}else{
					res.redirect('/projects/'+req.params.idPro);
				}
			});
			
		}
	});
});
router.put("/finish_module/:idMod/:idPro", (req, res)=>{
	var fd = new Date().toLocaleDateString('en-US');
	var myquery = {_id:req.params.idMod };
	var newVal = { $set:{
						status: 'finished',
						finishDate: fd
					}
	};
	Module.updateOne(myquery, newVal, function(err, result){
		if(err){
			throw err;
		}else{
			var mq = { _id: req.params.idPro };
			var nv = { $inc: {
									inProgressModules: -1,
									finishedModules:1
								}	 
			};
			Project.updateOne(mq, nv, function(err, result) {
				if (err){
					throw err;
				}else{
					res.redirect('/projects/'+req.params.idPro);
				}
			});
		}
	});
});

//edit team form
router.get('/editTeam/:id', (req, res)=>{
	Module.findById(req.params.id, (err, foundModule)=>{
		if(err)
			{
				console.log(err);
			}
		else
			{
				Employee.find({}, (err, allEmployee)=>{
					if(err)
						{
							console.log(err);
						}
					else
						{	
							res.render('teamForm', {employee:allEmployee, module: foundModule} );
						}
				});
			}
	});
});
//logic for team edit
router.put('/editTeam/:id',	(req, res)=>{
	console.log(req.body)
	res.redirect('/modules/'+req.params.id); // temporary
	//update the staffs' data
	
	//update the module data -> currStaff
});
//=========================================================================
//	AUTH ROUTES
//=========================================================================

//	REGISTER_MANAGER
router.get('/register_manager', (req, res)=>{
	res.render("auth_forms/signup_manager");
});
router.post('/register_manager', (req, res)=>{
	var newUser= new User({username: req.body.username, email: req.body.email});
	User.register(newUser, req.body.password, (err, user)=>{
		if(err)
			{
				console.log(error);
				return res.render('auth_forms/signup_manager');
			}
		passport.authenticate("local")(req, res, ()=>{
			res.redirect('/dashboard');
		});
	});
});
//EDIT MANAGER PROFILE
router.put('/editManagerProfile/:id', (req, res)=>{
	var myquery={_id:req.params.id};
	var newvalues = { $set:{
						email:req.body.email
					}
	};
	User.updateOne(myquery, newvalues, function(err, result) {
    	if (err){
			throw err;
		}else{
			res.redirect('/dashboard');
		}
    });
});
//	REGISTER_Employee
router.get('/register_employee', (req, res)=>{
	res.render("auth_forms/signup_employee");
});
router.post('/register_employee', (req, res)=>{
	var newEmployee= new Employee({username: req.body.username, 
								   email: req.body.email,
								   credits:0,
								   name:req.body.name,
								   expYears:0,
								   skills:[""],
								   available:true,
								   currentModule:{}
								  });
	Employee.create(newEmployee, (err, createdEmployee)=>{
		if(err)
			{
				console.log(err);
			}
		else
			{	
				console.log(createdEmployee);
				res.redirect('/dashboard_emp/'+createdEmployee._id);
			}
	});
	
	
});

//Edit Employee details
router.put("/employee_edit/:id", (req, res)=>{
	var myquery={_id:req.params.id};
	var newvalues = { $set:{
						email:req.body.email,
						name:req.body.name,
						skills:req.body.skills.split(',')
					}
	};
	Employee.updateOne(myquery, newvalues, function(err, result) {
    	if (err){
			throw err;
		}else{
			res.redirect('/dashboard_emp/'+req.params.id);
		}
    });
});

//	LOGIN_MANAGER
router.get('/login_manager', (req, res)=>{
	res.render("auth_forms/login_manager");
});
router.post('/login_manager', passport.authenticate("local", {
	successRedirect:"/dashboard",
	failureRedirect:"/login_manager"
}), (req, res)=>{
});

//	LOGIN_employee
router.get('/login_employee', (req, res)=>{
	res.render("auth_forms/login_employee");
});
router.post('/login_employee', (req, res)=>{
	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/mp", {useUnifiedTopology: true}, function (err, client) {
		var db = client.db('mp');
   		db.collection('employees').findOne({'username' : String(req.body.username)}, function (findErr, result) {
			if (findErr){ 
				console.log(findErr);
			}else if(result==null){
				res.send("Eiher you entered wrong code or you don't exist in our database !");
			}else{
				res.redirect("/dashboard_emp/"+result._id);
			}
				client.close();
		}); 
		
    });
});


//	LOGOUT
router.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/');
});

module.exports=router;