const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    },
    profile : {
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&psig=AOvVaw2aADtGX0gdhct6CfwjIKr9&ust=1700225660587000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCOjb_abIyIIDFQAAAAAdAAAAABAJ"
    },
    joining : {
        type : Date,
        default : Date.now
    }
})

const User = model('user', UserSchema)
module.exports = User