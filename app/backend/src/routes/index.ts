import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import usersRoutes from './usersRoutes';
import matchesRoutes from './matchesRoutes';
import leaderRoutes from './leaderboardsRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRoutes);
router.use('/matches', matchesRoutes);
router.use('/leaderboard', leaderRoutes);

export default router;
