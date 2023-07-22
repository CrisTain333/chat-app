import express from 'express';
import { UserController } from './controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.get('/me', auth(), UserController.getUser);
router.get('/', auth(), UserController.getAllUser);

export const UserRoute = router;
