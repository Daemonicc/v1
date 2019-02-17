var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var methodOverride = require('method-override');
var passport = require('passport');
var localStrategy = require('passport-local')
var Campground = require('./model/campground')
var Comment = require('./model/comment')
var User = require('./model/user')
var seedDB = require('./seeds')
var flash = require('connect-flash');

var commentRoute = require('./routes/comments'),
    campgroundRoute = require('./routes/campgrouds'),
    authRoute = require('./routes/index');


// seedDB();
app.use(express.static(__dirname + '/public'))
mongoose.connect("mongodb://localhost/yelpcamp", {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash())

// PASSPORT CONFIG

app.use(require('express-session')({
    secret: 'Diane is my Best friend',
    resave: false,
    saveUninitialized: false
}))




app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,  res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

app.use(authRoute);
app.use(campgroundRoute);
app.use(commentRoute);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});
