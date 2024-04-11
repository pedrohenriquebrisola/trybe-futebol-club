import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private MetchesService = new MatchesService()) {}

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.MetchesService.findAll();
    res.status(200).json(serviceResponse.data);
  }
}
