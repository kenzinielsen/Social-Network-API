const { Schema, model, Types } = require('mongoose');
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
            min:1,
            max: 280
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
);

ThoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.reduce((total, reactions) => total + reactions.replies.length + 1, 0);

});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;