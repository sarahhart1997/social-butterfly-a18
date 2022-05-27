const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true, 
    }, 
    email: {
        type: String, 
        unique: true, 
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    }, 
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            href: 'Thought', 
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            href: 'User', 
        }
    ], 
},
{
    toJSON: {
        virtuals: true
    }, 
    id: false
});

// Get full friends count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the user model
const User = model('User', UserSchema);

module.exports = User;