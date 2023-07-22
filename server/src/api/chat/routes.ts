import express from 'express';
import { ChatController } from './controller';
import auth from '../../middleware/auth';
const route = express.Router();

route.post(
    '/create-chat',
    auth(),
    ChatController.accessChat
);

export const ChatRoute = route;
