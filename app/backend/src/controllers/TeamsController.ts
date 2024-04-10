import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';

export default class TeamsController {
  constructor(private TeamService = new TeamsService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.TeamService.findAll();
    res.status(200).json(serviceResponse.data);
  }
}
