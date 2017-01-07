var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware/');

router.get('/', function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds:allCampgrounds});
        }
    });
});

//CREATE - Submit new CG
router.post('/', middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    //create a new CG and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
    //redirect back to CG page
            res.redirect('/campgrounds');
        }
    });
});

//New - Show form to create new CG
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

//SHOW - Shows more information about campground. 
router.get('/:id', function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
       if(err){
           //If there's an error, console.log it. 
           console.log(err);
       } else {
            //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//edit campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
            
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

//update campground route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds/'+req.params.id);
       }
   });
   //redirect to the show page
});

//Destroy CG Route
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds');
       }
   });
});

module.exports = router;