var express             =   require("express"),
    app                 =   express(),
    bodyParser          =   require("body-parser"),
    mongoose            =   require("mongoose"),
    campground          =   require("./models/campground.js"),
    comment             =   require("./models/comment.js"),
    seedDB              =   require("./seeds"),
    passport            =   require("passport"),
    LocalStrategy       =   require("passport-local"),
    methodOverride      =   require("method-override"),
passportLocalMongoose   =   require("passport-local-mongoose"),
    User                =   require("./models/user.js"),
    flash               =   require("connect-flash");
  
//Requiring routes 
var campgroundRoutes    =   require("./routes/campgrounds.js"),
    commentRoutes       =   require("./routes/comments.js"),
    indexRoutes         =   require("./routes/index.js");
    
// seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// =================CONNECT THE DATABASE=================

// console.log(process.env.DATABASEURL);
// mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://yelpCampAdmin:4qQIVTpMOyPeiXJc@yelpcamp-a5ssv.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

// =================PASSPORT CONFIGURATION===============

app.use(require("express-session")({
    secret: "Harry Potter was sighted in Hogsmeade this evening. Anyone having knowledge about Mr. Potter's where about, failing to come forward will be treated as equally guilty.",
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp server started successfully!!!");
});

