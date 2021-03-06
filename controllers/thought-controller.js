const { Thought } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select:'-__v'
        })
        .select('-__v')
        .sort({ _id:-1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).josn({message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id'})
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
                res.json(dbThoughtData);
        })
            .catch(err => res.status(400).json(err))
    },

    createReaction({ params, body }, res) {
        Reaction.create(
            { _id: params.thoughtId },
            { $push: { reaction: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found witht this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Reaction.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { replies: { reactionId: params.reactionId } } },
            { new: true }
        )
    .   then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
};

module.exports = thoughtController;