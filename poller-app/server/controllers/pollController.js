import Poll from '../models/Poll.js';

export const createPoll = async (req, res) => {
    const { question, options } = req.body;
    try {
        const poll = await Poll.create({
            question,
            options: options.map(opt => ({ text: opt })),
            createdBy: req.user.id
        });
        res.status(201).json(poll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPollById = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });
        res.json(poll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
