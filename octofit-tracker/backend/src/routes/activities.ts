import { Router } from 'express';
import { Activity } from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  const activities = await Activity.find().populate('user', 'name email').sort({ completedAt: -1 }).lean();
  response.json(activities);
});

export default activitiesRouter;