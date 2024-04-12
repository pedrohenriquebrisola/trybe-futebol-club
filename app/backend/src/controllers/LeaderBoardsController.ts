import { Request, Response } from 'express';
import LeaderBoardsService from '../services/LeaderboardsServices';

export default class LeaderController {
  constructor(private leaderBoardsService = new LeaderBoardsService()) {}

  public async getAllLeader(req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardsService.findAll(true, false);
    res.status(200).json(serviceResponse);
  }

  // prettier-ignore
  public async getAllLeaderAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardsService.findAll(
      false,
      false,
    );
    res.status(200).json(serviceResponse);
  }

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardsService.findAll(false, true);
    res.status(200).json(serviceResponse);
  }
}
