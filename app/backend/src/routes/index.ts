import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import usersRoutes from './usersRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRoutes);

export default router;
