import { Router } from 'express';
import { register, login } from '../api/auth/controller';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;
