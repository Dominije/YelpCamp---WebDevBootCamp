var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var seedDB = require('./seeds');
var methodOverride = require('method-override');
var flash = require('connect-flash');

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";

mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //Seed the Database

// Passport configuration
app.use(require('express-session')({
    secret: "Thea hates her haircut!",
    resave: false,
    saveUninitialized: false
}))



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Uncomment the function below to create a new campground without running through the form. This will execute when app.js is run
/*Campground.create({
    name: "Mountain Goat's Rest", 
    image: "https://c4.staticflickr.com/4/3191/3061337059_36c9457ab6_b.jpg",
    description: "There was nothing RESTful about the mountain goats that I met here! They tried to GET me when I was sleeping, even while tied to a POST!!!"
    }, function(err, campground){
    if(err){
        console.log(err);
    } else {
        console.log("New Campground Created!");
        console.log(campground);
    }
});*/

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started!");
});