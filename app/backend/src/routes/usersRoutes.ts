// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validations';

const userController = new UserController();

const router = Router();
// prettier-ignore
router.post('/', Validations.validateLogin, (req: Request, res: Response) =>
  userController.login(req, res));
// prettier-ignore

router.get('/role', Validations.validateToken, (req: Request, res: Response) =>
  userController.loginRole(req, res));

export default router;
