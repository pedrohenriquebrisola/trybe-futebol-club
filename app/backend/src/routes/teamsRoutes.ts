// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();
// prettier-ignore
router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

export default router;
