import { Router } from 'express';
import { Team } from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members', 'name email').sort({ name: 1 }).lean();
  response.json(teams);
});

export default teamsRouter;