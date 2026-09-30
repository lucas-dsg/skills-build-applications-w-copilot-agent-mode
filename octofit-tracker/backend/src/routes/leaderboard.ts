import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'name email')
    .sort({ rank: 1 })
    .lean();
  response.json(leaderboard);
});

export default leaderboardRouter;