var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
    name: "Cloud's Rest",
    image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5115588.jpg",
    description: "Blah blab blah!"
    },
    {
    name: "Sun's Rest",
    image: "http://www.whcg.net/images/summer.jpg",
    description: "Blah blab blah!"
    },
    {
    name: "Moon's Rest",
    image: "http://roadslesstraveled.us/blog/wp-content/uploads/2015/06/07-721-Waterfront-RV-campsite-Narrows-Too-RV-Resort-Acadia-National-Park-Maine.jpg",
    description: "Blah blab blah!"
    }
];

function seedDB(){
    Campground.remove({}, function(err){
/*        if(err){
            console.log(err);
        } else {
            console.log('removed campgrounds!');
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {//Begin Else 2
                        console.log("Added a campground!");
                        //Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was Internet.", 
                                author: "Homer"
                            }, function (err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment!");
                                }
                            }
                        );//end Comment.create
                    }//end Else 2
                });//End Campground.create
            })//end forEach
        };//End Else 1 
*/
    })
};

module.exports = seedDB;