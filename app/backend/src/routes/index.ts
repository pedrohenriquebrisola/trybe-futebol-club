import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import usersRoutes from './usersRoutes';
import matchesRoutes from './matchesRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRoutes);
router.use('/matches', matchesRoutes);

export default router;
