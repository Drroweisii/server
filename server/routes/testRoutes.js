import express from 'express';
import { TestController } from '../controllers/testController.js';

const router = express.Router();
const testController = new TestController();

router.get('/test', testController.apiTest);
router.post('/mongodb/test', testController.mongoWrite);
router.get('/mongodb/read', testController.mongoRead);

export default router;