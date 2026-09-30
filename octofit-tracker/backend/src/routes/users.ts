import { Router } from 'express';
import { User } from '../models/user.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  const users = await User.find().sort({ name: 1 }).lean();
  response.json(users);
});

export default usersRouter;