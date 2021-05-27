const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: [true, "{PATH} is required."],
        minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
    },
    location: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [4, "{PATH} must be at least {MINLENGTH} characters"]
    },
    duration: {
        type: Number,
        required: [true, "{PATH} is required."]
    },
    units: {
        type: String,
        required: [true, "{PATH} is required."]
    },
    date : {
        type: Date,
        required: [true, "{PATH} is required."]
    },
    time: {
        type: String,
        required: [true, "{PATH} is required."]
    },
    description : {
        type: String,
        required: [true, "{PATH} is required."]
    }
    },
    { timestamps: true }
);

module.exports.Activity = mongoose.model('Activity', ActivitySchema);