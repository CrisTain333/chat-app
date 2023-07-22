import express from 'express';
import { AuthRoute } from '../api/auth/routes';
import { UserRoute } from '../api/user/routes';

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/user', UserRoute);

export default router;
