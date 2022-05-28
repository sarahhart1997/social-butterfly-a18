const {Schema, model, types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema ({
    // Set unique id to avoid confusion 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxLength: 280
    }, 
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: createdAtVal => dateFormat(createdAtVal)
    },
},
{
    toJSON: {
            getters: true
        }, 
    id: false,
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        trim: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String, 
        required: true
    }, 
    reaction: [reactionSchema]
}, 
{
    toJSON: {
        virtuals: true, 
        getters: true
    }, 
    id: false
});

// Get all thoughts and replies
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;