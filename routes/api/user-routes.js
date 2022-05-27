const router = require('express').Router();

const {
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/Users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/Users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/Users/:userId/friends
router
    .route('/:userId/friends')
    .post(addFriend)

// /api/Users/:userId/friends/:friendId
router
    .route('/:userId/friends/friendId')
    .delete(deleteFriend);

module.exports = router;