const { Schema, model } = require("mongoose");

const linkSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    order: {
        type: Number,
        required: false
    }
},{
    timestamps: true
})

const Link = new model("Link", linkSchema);

module.exports = Link;