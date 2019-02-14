var express = require('express');
var router = express.Router();
var Campground = require('../model/campground');
var middleware = require('../middleware/index')


// index route -- show all campground
router.get('/campgrounds', function(req, res){
    Campground.find({}).populate('comments').exec(function(err, campgrounds){
        if (err){
            console.log(err);
        }else{
            res.render('campgrounds/index', {campgrounds: campgrounds, currentUser: req.user});
        }
    })

})

//CREATE ROUTE -- add new route to DB
router.post('/campgrounds',middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var  author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author, price: price};
    Campground.create(newCampground, function(err, newCreated){
        if (err){
            console.log(err);
        }else {
            res.redirect('/campgrounds');
        }
    })
    

})

router.get('/campgrounds/new', middleware.isLoggedIn, function(req,res){
    res.render('campgrounds/new')
})

router.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if (err){
            console.log('Cannot find id')
        }else{
            res.render('campgrounds/show', {campground: foundCampground})
        }
    })
    
})
// EDITCAMPGROUD

router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
            }else{
                    res.render('campgrounds/edit', {campground: foundCampground});
            }
        })
      
})

router.put('/campgrounds/:id', middleware.checkCampgroundOwnership,  (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            console.log(err);
             res.redirect('/campgrounds');
        }else{
             res.redirect('/campgrounds/'+ req.params.id);
        }
    })

});

router.delete('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if (err){
            console.log(err)
        }else{
             res.redirect('/Campgrounds');
        }
    })
})

function checkCampgroundOwnership(req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                console.log(err)
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next()
                } else{
                     res.redirect('back');
                }
            }
        })
    }else{
         res.redirect('/login');
    }
}



module.exports = router;