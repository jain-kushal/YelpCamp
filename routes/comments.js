var express = require("express"),
    router  = express.Router({mergeParams: true}),
    middleware  = require("../middleware");

var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // find the campground using findById
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground});
        }
    });
});


//comments create
router.post("/", middleware.isLoggedIn, (req, res) => {
    // lookup the campground
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/camgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, (err, comment) =>{
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // console.log("who commented?: " + req.user.username);
                    comment.save();
                    console.log(comment);
                    // connect new comment to the campground and push it in
                    campground.comments.push(comment);
                    campground.save();
                    
                    // redirect to the respective campground page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// comments edit- GET
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    var campground_id = req.params.id;
    var comment_id = req.params.comment_id;
    Comment.findById(comment_id, (err, comment) => {
        if(err){
            console.log(err);
        } else {
            // console.log(req.params.id);
            res.render("comments/edit", {campground_id, comment});
        }
    });
});

// UPDATE route (Comments)
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY route (comments)
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err){
            console.log(err);
            res.redirect("/back");
        } else {
            res.redirect("back");
        }
    });
});

module.exports = router;