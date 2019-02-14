var Campground  =  require('../model/campground');
var Comment = require('../model/comment')
var middlewareObj  =  {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if (req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if (err){
                    req.flash('error', 'Campground not found')
                     res.redirect('back');
                }
                else{
                    if (!foundCampground) {
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }
                    if(foundCampground.author.id.equals(req.user._id)){
                        next()
                    } else{
                        res.flash('error', 'You  dont have permission to do that')
                         res.redirect('back');
                    }
                }
            })
        }else{
             res.redirect('/login');
        }
    

}
middlewareObj.checkCommentOwnership  = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                console.log(err)
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                } else{
                    res.redirect('back');
                }
            }
        })
    }else{
        res.redirect('back');
    }
}
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You must be login in to do that')
    res.redirect("/login");
}

module.exports  = middlewareObj;