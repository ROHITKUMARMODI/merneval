const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
    },
    type: {
        type: Number,
        default: 0,
        enum: [0,1] // 0 is user customer, 1 is seller
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("users", UserSchema)