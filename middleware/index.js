var Campground = require('../models/campground'), 
    Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash('error', 'Campground not found!');
                    res.redirect('back');
                } else {
                    //Does user own campground?
                    if(foundCampground.author.id.equals(req.user._id)){
                        //if so, show the edit form
                        next();
                    } else {
                        //If not, redirect
                        req.flash('error', "You don't have permission to do that. Nice try, though.");
                        res.redirect('back');
                    }
                }
            });
    } else {
    //If not, redirect
       res.flash('error', 'You must be logged in to do that!');
       res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash('error', 'Comment not found!');
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect('back');
                }
            }
        });
    } else {
       res.flash('error', 'You must be logged in to do that!');
       res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', "You must be logged in to do that! Please log in to try again.");
    res.redirect('/login');
};

module.exports = middlewareObj;
