var express = require('express');
var router = express.Router();
var Campground = require('../model/campground');
var Comment = require('../model/comment');
var middleware = require('../middleware/index')

router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, function(req, res){

    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {campground: campground})
        }
    })
    
})
router.post('/campgrounds/:id/comments', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err)
            res.redirect('/campground/:id/new')
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err)
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username =  req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment)
                    campground.save();
                    req.flash('success', 'comment sucessfully added')
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
})

router.get('/campgrounds/:id/comments/:comment_id/edit',middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
             res.redirect('back');
        }else{
            res.render('comments/edit', {campground_id : req.params.id, comment: foundComment})
        }
    })
        
});

router.put('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
             res.redirect('back');
        }else{
             res.redirect('/campgrounds/' + req.params.id);
        }
    })

})

router.delete('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
             res.redirect('back');
        }else{
            req.flash('success', 'Comment sucessfully deleted')
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});




module.exports = router;