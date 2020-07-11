var mongoose=require("mongoose");

var moduleSchema = new mongoose.Schema({
	
	startDate:Date,
	moduleName: String,
	status: String, // ("backlog", "progress", "finished")
	kloc: Number,
	effort: Number,
	staffReq:Number,
	staffCurr:Number,
	dueDate: Date,
	finishDate: Date,	
	rating: Number,
	deadlineIndex: Number,
	tasksTodo:Number,
	tasksFinished:Number,
	
	parentProject: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref:"Project"
		},
		projectName: String
	}
});

module.exports = mongoose.model("Module", moduleSchema);