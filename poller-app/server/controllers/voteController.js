import Poll from '../models/Poll.js';

export const votePoll = async (req, res) => {
    const { optionIndex } = req.body;
    try {
        const poll = await Poll.findById(req.params.pollId);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });

        // Prevent double voting by user
        if (poll.votes.some(v => v.user.toString() === req.user.id))
            return res.status(400).json({ message: 'Already voted' });

        poll.options[optionIndex].votes += 1;
        poll.votes.push({ user: req.user.id, optionIndex });
        await poll.save();

        res.json(poll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
