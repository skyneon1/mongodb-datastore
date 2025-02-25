const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    locality: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
