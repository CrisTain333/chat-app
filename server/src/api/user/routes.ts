import express from 'express';
import { UserController } from './controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.get('/me', auth(), UserController.getUser);

export const UserRoute = router;
