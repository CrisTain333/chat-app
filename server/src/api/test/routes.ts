import express from 'express';
import { TestController } from './controller';
const router = express.Router();

router.get('/', TestController.testController);

export const TestRoute = router;
