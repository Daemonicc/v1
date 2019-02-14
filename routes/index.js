var express = require('express')
var  router = express.Router();
var passport = require('passport');
var  User = require('../model/user')

router.get('/', function(req, res){
    res.render('landing');
})
router.get('/register', function(req, res){
    res.render('auth/register')
})
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message)
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp  ' + user.username)
            res.redirect('/')
        })
    })
})

//login
router.get('/login', function(req,res){
    res.render('auth/login')
})

router.post('/login',passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}) , function(req,res){
})

router.get("/logout", function(req, res){
    req.logout();
    req.flash('success', 'logged you out')
    res.redirect("/campgrounds");
 });

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router