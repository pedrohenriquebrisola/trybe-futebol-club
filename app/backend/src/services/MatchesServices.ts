import { ServiceResponse } from '../Interfaces/ServicesResponse';
import { IMatches, IMatchesCreate } from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModels';
import TeamsModel from '../models/TeamsModels';

// prettier-ignore
export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) {}

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

  // prettier-ignore
  public async updateMatche(
    homeTeamG: number,
    awayTeamG: number,
    id: number,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatche(homeTeamG, awayTeamG, id);
    return { status: 'SUCCESSFUL', data: { message: 'Changed Successfully' } };
  }

  // prettier-ignore
  public async createMatche(data: IMatchesCreate):
  Promise<ServiceResponse<IMatches | { message: string }>> {
    if (data.homeTeamId === data.awayTeamId) {
      return {
        status: 'UNPROCESSABLE',
        data: {
          message: 'It is not possible to create a match with two equal teams',
        },
      };
    }
    const team1 = await this.teamsModel.findById(data.awayTeamId);
    const team2 = await this.teamsModel.findById(data.homeTeamId);
    if (team1 === null || team2 === null) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const created = await this.matchesModel.create(data);
    return { status: 'CREATE', data: created };
  }
}
