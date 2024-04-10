import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';
import mapStatusHTTP from '../utils/HTTPStatus';

export default class TeamsController {
  constructor(private TeamService = new TeamsService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.TeamService.findAll();
    res.status(200).json(serviceResponse.data);
  }

  public async getBookById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.TeamService.getTeamsById(Number(id));

    return res
      .status(mapStatusHTTP(serviceResponse.status))
      .json(serviceResponse.data);
  }
}
