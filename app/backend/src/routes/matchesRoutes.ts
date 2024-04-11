// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const router = Router();
// prettier-ignore
router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
// prettier-ignore

export default router;
