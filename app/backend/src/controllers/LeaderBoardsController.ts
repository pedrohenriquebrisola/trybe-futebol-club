import { Request, Response } from 'express';
import LeaderBoardsService from '../services/LeaderboardsServices';

export default class LeaderController {
  constructor(private leaderBoardsService = new LeaderBoardsService()) {}

  public async getAllLeader(req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardsService.findAll();
    res.status(200).json(serviceResponse);
  }
}
