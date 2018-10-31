var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../middleware");
    
var campground = require("../models/campground.js");


// ----------------Index route---------------------------
router.get("/", (req, res) =>{
    
    // Get all campgrounds from the db
    campground.find({}, (err, campgrounds) =>{
        if (err){
        console.log(err);
    } else {
        // console.log(campgrounds);
        res.render("campgrounds/index", {campgrounds});
    }
    });
});

// ----------------Create route---------------------------
router.post("/", middleware.isLoggedIn, (req, res) => {
    
    // get data from form and add it to the campgrounds array

    campground.create(req.body.campground, (err, newlyAdded) =>{
            if (err){
                req.flash("error", "Something went wrong");
                console.log("OMG!!! ERROR: " + err );
        } else {
            // console.log(req.user);
            newlyAdded.author.id = req.user._id;
            newlyAdded.author.username = req.user.username;
            newlyAdded.save();
            console.log("Successfully added " + newlyAdded);
            res.redirect("/campgrounds");   // redirect back to campgrounds page
        }
    });
});

// -----------New route (to show new page to create a new campground)----
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new", {currentUser: req.user});
});

// ----------Show route: to show more info about a particular campground----------
router.get("/:id", (req, res) => {
    var id = req.params.id;
    // console.log(id);
    campground.findById(id).populate("comments").exec((err, retrievedData) => {
        if (err){
            console.log("ERROR FOUND: " + err);
        } else{
            res.render("campgrounds/show", {campground: retrievedData});
            // console.log(retrievedData);
        }
    });
});

// Edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    
    campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// Update route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + updatedCampground.id);
        }
    })
});

// DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Comment deleted successfully");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;