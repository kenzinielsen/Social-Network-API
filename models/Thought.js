const { Schema, Thought } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            //character max
        },
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
        {
            toJSON: {
                getters: true
            }
        }
)


const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            // between characters
        },
        createdAt: {
            type: Date,
            default:Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)



//const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;