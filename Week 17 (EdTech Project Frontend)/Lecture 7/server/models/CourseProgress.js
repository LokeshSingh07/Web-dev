const mongoose = require("mongoose");


const courseProgressSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
    }],
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);