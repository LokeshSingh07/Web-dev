const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType : {
        type: String,
        enum :["Admin", "Student", "Instructor"],
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    }],
    image: {
        type: String,
        required: true,
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CourseProgress"
    }],

    token :{
        type: String,
        required: true,
    },
    ressetPasswordExpires: {
        type: Date,
        required: true,
    },


});

module.exports = mongoose.model("User", userSchema);