var mongoose    = require("mongoose"),
    campground  = require("./models/campground"),
    comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg",
        description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Napa hiking Valley",
        image: "https://farm2.staticflickr.com/1832/42962226542_cf23d7050f.jpg",
        description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Paradise Hiking",
        image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
        description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
];

function seedDB() {
    campground.remove({}, (err) => {
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
    });
    // //add a few campgounds
    // data.forEach((seed) => {
    //     campground.create(seed, (err, campground) => {
    //         if(err){
    //             console.log(err);
    //         } else{
    //             console.log("added campground");
    //             // add a few comments
    //             comment.create(
    //                 {
    //                     text: "Good place but no internet!!!",
    //                     author: "Jack"
    //                 }, (err, comment) => {
    //                     if(err){
    //                         console.log(err);
    //                     } else{
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("created new comment");
    //                     }
    //                 });
    //         }
    //     });
    // });
};


module.exports = seedDB;