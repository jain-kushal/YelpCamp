var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var campgroundSchema = new Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    author:
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
    price: Number
});

//creation of the model which will help us in working with methods such as find(), update(), etc
var campground = mongoose.model("campground", campgroundSchema);

module.exports = campground;