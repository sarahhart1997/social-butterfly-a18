const { Thought, User,  } = require('../models');

const ThoughtController = {
  
  getAllThoughts(req, res) {
    console.log("thought logged");
    Thought.find({})
    .populate({
      path: 'reaction',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one User by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
    .populate({
      path: 'reaction',
      select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // add Thought to User
 createThought ({ body }, res) {
         Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
              );
            })
            .then(dbThoughtData => {
              if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
              }
              res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
          },
          
  
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
       body,
        { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // remove Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.thoughtId } )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought with this id!' });
          return;
        }
     
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )
    .populate({
      path:'reaction',
      select:'-__v'
    })
    .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

// remove Reaction
deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reaction: { reactionId: params.reactionId } } },
    { new: true }
  )
  .then(dbThoughtData => {
    if (!dbThoughtData) {
      res.status(404).json({ message: 'No reaction found with this id!' });
      return;
    }
    res.json(dbThoughtData);
  })
    .catch(err => res.json(err));
}
};

module.exports = ThoughtController;