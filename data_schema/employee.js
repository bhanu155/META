var mongoose=require("mongoose"),
	passportLocalMongoose=require("passport-local-mongoose");

var employeeSchema=new mongoose.Schema({
	username:String,
	name:String,
	email:String,
	expYears:Number,
	credits:[Number],
	available:Boolean,
	skills:[String],
	currentModule:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Module"
		},
		moduleName:String
	}
});

employeeSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("Employee", employeeSchema);