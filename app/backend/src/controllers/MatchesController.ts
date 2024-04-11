import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private MetchesService = new MatchesService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    // console.log(typeof inProgress);
    // console.log(inProgress);

    if (inProgress === undefined) {
      const serviceResponse = await this.MetchesService.findAll();
      res.status(200).json(serviceResponse.data);
    }
    const progress = inProgress === 'true';
    const serviceResponse = await this.MetchesService.findAllProgress(progress);
    res.status(200).json(serviceResponse.data);
  }
  // prettier-ignore

  public async finishingMatche(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.MetchesService.finishingProgress(Number(id));
    res.status(200).json(serviceResponse.data);
  }
}
