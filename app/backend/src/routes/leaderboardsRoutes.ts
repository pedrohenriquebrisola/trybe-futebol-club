// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import LeaderBoards from '../controllers/LeaderBoardsController';

const LeaderController = new LeaderBoards();

const router = Router();
// prettier-ignore
router.get('/home', (req: Request, res: Response) => LeaderController.getAllLeader(req, res));
// prettier-ignore
export default router;
