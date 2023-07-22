import express from 'express';
import { AuthRoute } from '../api/auth/routes';
import { UserRoute } from '../api/user/routes';
import { ChatRoute } from '../api/chat/routes';

const router = express.Router();

router.use('/auth', AuthRoute);

router.use('/user', UserRoute);

router.use('/chat', ChatRoute);

export default router;
