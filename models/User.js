const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //match valid email
        },
        thoughts: {

        }, 
        friends: {

        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const User = model('User', UserSchema);

module.exports = User;