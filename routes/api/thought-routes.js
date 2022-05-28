const router = require('express').Router();

const {
    getAllThoughts, 
    createThought,
    getThoughtById, 
    updateThought,
    deleteThought,
    createReaction, 
    deleteReaction,
} = require('../../controllers/thought-controller');

// /api/Thoughts/<UserId>
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/Thoughts/<Id>
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// /api/Thoughts/<Id>/reaction
router
    .route('/:thoughtId/reaction')
    .post(createReaction)

// /api/Thoughts/<UserId>/<ThoughtId>/<replyId>
router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction)

module.exports = router;