import express from 'express';
import { ChatController } from './controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { chatValidation } from './validation';
const route = express.Router();

route.post(
    '/create-chat',
    auth(),
    validateRequest(chatValidation.createChatZodSchema),
    ChatController.accessChat
);

route.get(
    '/find/:firstId/:secondId',
    auth(),
    ChatController.findUserChats
);
route.get('/:id', auth(), ChatController.getUserChats);

export const ChatRoute = route;
