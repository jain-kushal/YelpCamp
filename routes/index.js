var express     = require("express"),
    router  = express.Router({mergeParams: true}),
    passport    = require("passport"),
    User        = require("../models/user.js");
    
//ROOT route
router.get("/", (req, res) => {
    res.render("landing");
});


// Register form
router.get("/register", (req, res) => {
    res.render("register");
});

// POST route: Register
router.post("/register", (req, res) => {
    
    var newUser = new User({username: req.body.username});
    var newUserPassword = req.body.password;
    
    User.register(newUser, newUserPassword, (err, newUserData) => {
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to YelpCamp " + newUserData.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//login route
router.get("/login", (req, res) => {
    res.render("login");
});

//login route logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
    
});

//logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out successfully!");
    res.redirect("back");
})

module.exports = router;