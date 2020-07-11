var mongoose=require("mongoose");

var projectSchema = new mongoose.Schema({
	
	projectName: String,
	startDate: Date,
	deadline: Date,
	// timeRemaining = Deadline date - current date
	duration: Number,
	percentCompleted: Number,
	archived: Boolean,
	numberOfModules: Number,
	backlogModules: Number,
	inProgressModules: Number,
	finishedModules: Number,
	actualDuration:Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	}
});

module.exports = mongoose.model("Project", projectSchema);