import express from 'express';
import { createPoll, getPolls, getPollById } from '../controllers/pollController.js';
import { protect } from '../middleware/authMiddleware.js';
import Poll from '../models/poll.model.js';

const router = express.Router();

// POST /polls - create a poll
router.post('/', protect, async (req, res) => {
  const { question, options } = req.body;
  if (!question || !options || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ message: 'Invalid poll data' });
  }
  try {
    const poll = await Poll.create({
      question,
      options: options.map(text => ({ text, votes: 0 }))
    });
    res.status(201).json({
      id: poll._id,
      question: poll.question,
      options: poll.options
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /polls - list all polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(
      polls.map(poll => ({
        id: poll._id,
        question: poll.question,
        options: poll.options
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /polls/:id/vote - vote for an option
router.post('/:id/vote', async (req, res) => {
  const { optionIndex } = req.body;
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    if (
      typeof optionIndex !== 'number' ||
      optionIndex < 0 ||
      optionIndex >= poll.options.length
    ) {
      return res.status(400).json({ message: 'Invalid option index' });
    }
    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.json({
      id: poll._id,
      question: poll.question,
      options: poll.options
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
