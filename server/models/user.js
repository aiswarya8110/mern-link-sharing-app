const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: false,
        default: ''
    },
    last_name: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false,
        default: ''
    },
    token: {
        type: String,
        required: false
    }},
    {
        timestamps: true
    }
)

// This method is called before sending the document as JSON
UserSchema.methods.toJSON = function(){
    const user = this; // current document
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.token

    return userObject
}

const User = new model("User", UserSchema);

module.exports = User;