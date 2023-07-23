import express from 'express';
import { MessageController } from './controller';
import auth from '../../middleware/auth';
const router = express.Router();

// ** Add Message
router.post('/', auth(), MessageController.addMessage);

// ** Get Messages
router.get(
    '/:chatId',
    auth(),
    MessageController.getMessages
);

export const MessageRoute = router;
