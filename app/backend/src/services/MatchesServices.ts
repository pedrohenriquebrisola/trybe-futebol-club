import { ServiceResponse } from '../Interfaces/ServicesResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModels';

export default class MatchesService {
  constructor(private matchesModel: MatchesModel = new MatchesModel()) {}

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const allInfo = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allInfo };
  }
  // prettier-ignore

  public async findAllProgress(
    progress: true | false,
  ): Promise<ServiceResponse<IMatches[]>> {
    const allInfoProgress = await this.matchesModel.findAllProgress(progress);
    return { status: 'SUCCESSFUL', data: allInfoProgress };
  }

  // prettier-ignore
  public async finishingProgress(id: number):
  Promise<ServiceResponse<{ message: 'Finished' }>> {
    await this.matchesModel.finishingProgress(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
