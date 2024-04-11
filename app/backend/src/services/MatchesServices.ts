import { ServiceResponse } from '../Interfaces/ServicesResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModels';

export default class MatchesService {
  constructor(private matchesModel: MatchesModel = new MatchesModel()) {}

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const allInfo = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allInfo };
  }
}
