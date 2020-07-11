var express=require("express");
var	app=express();
var	bodyParser=require("body-parser");
var mongoose=require("mongoose");
var methodOverride=require("method-override");
var passport=require("passport");
var	localStrategy=require("passport-local");
var	flash=require("connect-flash");
//importing Schemas
	//var Game=require("./models/game");
var User=require('./data_schema/user');
//IMPORTING ROUTES
	//var mygamesRoutes=require("./routes/mygames");
var indexRoutes=require("./routes/index");

//common config.
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/mp", {
	useNewUrlParser: true,
	useUnifiedTopology:true,
	useCreateIndex:true,
	useFindAndModify:false
});
app.use(express.static(__dirname + "/public")); //linking css
app.use(methodOverride('_method'));

//	PASSPORT CONFIG.
app.use(require("express-session")({
	secret: "project",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	next();
});


//ROUTES
app.use(indexRoutes);
	//app.use("/mygames", mygamesRoutes);


app.listen(6000, (req, res)=>{
	console.log("server running on port 6000");
});
