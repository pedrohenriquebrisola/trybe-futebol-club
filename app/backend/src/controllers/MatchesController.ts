import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';
import mapStatusHTTP from '../utils/HTTPStatus';

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
  // prettier-ignore

  public async updateMatche(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.MetchesService.updateMatche(
      homeTeamGoals,
      awayTeamGoals,
      Number(id),
    );
    res.status(200).json(serviceResponse.data);
  }

  public async createMatche(req: Request, res: Response) {
    const serviceResponse = await this.MetchesService.createMatche(req.body);
    return res
      .status(mapStatusHTTP(serviceResponse.status))
      .json(serviceResponse.data);
  }
}
