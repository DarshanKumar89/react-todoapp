import { Router } from 'express';
import { Auth } from '../helper/token';
import { createTask, getTasks } from '../api/task/controller';

const taskRouter = Router();

taskRouter.use(Auth);

taskRouter.post('/task', createTask);
taskRouter.get('/task', getTasks);

export default taskRouter;
