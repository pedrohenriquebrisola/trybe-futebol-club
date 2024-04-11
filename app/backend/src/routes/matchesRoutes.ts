// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middlewares/validations';

const matchesController = new MatchesController();

const router = Router();
// prettier-ignore
router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
// prettier-ignore
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishingMatche(req, res),
);

// prettier-ignore
router.patch('/:id', Validations.validateToken, (req: Request, res: Response) =>
  matchesController.updateMatche(req, res));
export default router;
