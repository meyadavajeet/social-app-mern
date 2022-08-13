const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 5
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        max: 255,
    },
    city: {
        type: String,
        max: 255,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        emum: [1, 2, 3]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
    {
        timestamp: true
    }
);

module.exports = mongoose.model("User", UserSchema);
