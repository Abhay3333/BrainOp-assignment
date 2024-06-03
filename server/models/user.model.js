const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
        minlength: 8

    },

    profileImage:{
        type: String,
        default: 'https://shorturl.at/shSbD'
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    
    

    
    confirmPassword:{
        type: String,
        
        minlength: 8
    }
    
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;