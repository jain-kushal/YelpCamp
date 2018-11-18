// middleware here

var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var loginNedded = "Please login first",
    authError   = "You are not authorized to do that!";

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
                Campground.findById(req.params.id, (err, foundCampground) => {
                    if(err){
                        req.flash("error", "Campground not found");
                        res.redirect("back");
                    } else {
                        // does the user own it
                        // console.log(foundCampground.author.id);
                        // console.log(req.user._id);
                            if(foundCampground.author.id.equals(req.user._id)){
                                next();
                            } else {
                                req.flash("error", authError);
                                res.redirect("/campgrounds/" + foundCampground.id);
                            }
                    }
                });
        } else {
            req.flash("error", loginNedded);
            res.redirect("back");
        }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
                Comment.findById(req.params.comment_id, (err, foundComment) => {
                    if(err){
                        req.flash("error", "Comment not found");
                        res.redirect("/campgrounds");
                    } else {
                        // does the user own it
                            if(foundComment.author.id.equals(req.user._id)){
                                next();
                            } else {
                                req.flash("error", authError);
                                res.redirect("back");
                            }
                    }
                });
        } else {
            req.flash("error", loginNedded);
            res.redirect("back");
        }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", loginNedded);
    res.redirect("/login");
};

module.exports = middlewareObj;