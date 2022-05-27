const { User, Thought } = require('../models');

const UserController = {
    getAllUsers(req, res) {
        User.find({})
        .populate ({
            path: 'friends',
            path: 'thoughts',
            select: '-__v'
            
            
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                path: 'thoughts',
                select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
    postNewUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        // .deleteMany({_id: this.thoughts.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
            res.json({ message: "User and their associated thoughts deleted"})
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: { _id: params.friendId }}},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },
    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    }
}

module.exports = UserController;