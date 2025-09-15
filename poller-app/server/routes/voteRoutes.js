import express from 'express';
import { votePoll } from '../controllers/voteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:pollId', protect, votePoll);

export default router;
